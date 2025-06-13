const axios = require("axios")
const cheerio = require("cheerio")
const fs = require("fs")
const path = require("path")

const Hapi = require("@hapi/hapi")
const Inert = require("@hapi/inert")

const CACHE_FILE = path.join(__dirname, "conditions-with-supabase-paths.json");
const BASE_URL = "https://dermnetnz.org";
const BATCH_DELAY = 500; // ms
const BATCH_SIZE = 5;

// const fetch = require("node-fetch")

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const scrapeListSkinCondition = async () => {
    // Load cache if it exists
    if (fs.existsSync(CACHE_FILE)) {
        console.log("Loaded data from cache.");
        return JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
    }

    try {
        const res = await axios.get(`${BASE_URL}/topics`);
        const $ = cheerio.load(res.data);

        const links = [];

        $('div.topics__wrap__grid__column__list a').each((i, el) =>{
            const name = $(el).text().trim();
            const href = $(el).attr('href');
            if(name && href){
                links.push({name, url: BASE_URL + href})
            }
        })

        const results = [];

        for (let i = 0; i < links.length; i += BATCH_SIZE) {
            const batch = links.slice(i, i + BATCH_SIZE);

            const settled = await Promise.allSettled(
                batch.map(async (item) => {
                    try {
                        const detailRes = await axios.get(item.url);
                        const $$ = cheerio.load(detailRes.data);
                        
                        const contentElements = $$('.text-block__wrap').children('h1, h2, h3, p, ul, ol');
                        const sections = []
                        
                        let currentSection = {
                            heading: "Introduction",
                            level: "h2",
                            content: ""
                        };
                
                        contentElements.each((i, el) =>{
                            const tag = $$(el).get(0).tagName;
                            if (tag  === 'h1'|| tag === 'h2' || tag === 'h3'){
                                //push previous section
                                if(currentSection.content.trim()) sections.push({ ...currentSection });
                                //create new curSection
                                currentSection = {
                                    heading: $$(el).text().trim(),
                                    level:tag,
                                    content: ""
                                }
                            } else if(tag === 'p'){
                                currentSection.content += $$(el).text().trim() + '\n\n';
                            } else if (tag === 'ul'|| tag ==='ol'){
                                $$(el).find('li').each((_, li) => {
                                    currentSection.content += '- ' + $$(li).text().trim() + '\n';
                                })
                                currentSection.content += '\n'
                            }
                        })
                        if (currentSection.content.trim()) sections.push(currentSection);

                        const images = [];

                        $$('.gallery__slides__item__image img').each((i, el) => {
                            const src = $$(el).attr('src');
                            const alt = $$(el).attr('alt') || "";
                            const title = $$(el).attr('data-title') || $$(el).attr('data-headline') || "";
                            if(src){
                                images.push({
                                    src: BASE_URL + src,
                                    alt: alt.trim(),
                                    title: title.trim(),
                                })
                            }
                        })
                        return { name: item.name, sections, images };
                    } catch (error) {
                        return { name: item.name, sections: "Failed to fetch description.", images: ""};
                    }
                })
            )
            results.push(...settled.map((r) => r.value || { name: "Unknown", description: "Error"}))
            if (i + BATCH_SIZE < links.length){
                 console.log(`Processed ${i + BATCH_SIZE}/${links.length} - sleeping ${BATCH_DELAY}ms...`);
                 await sleep(BATCH_DELAY)
            }
        }
        
        // for (const item of links){
        //     try {
        //         const detailRes = await axios.get(item.url);
        //         const $$ = cheerio.load(detailRes.data);
                
        //         const contentElements = $$('.text-block__wrap').find('p, ul, ol, h2, h3');
        //         let fullDescription = '';

        //         contentElements.each((i, el) =>{
        //             const tag = $$(el).get(0).tagName;
        //             if (tag  === 'p'|| tag === 'h2' || tag === 'h3'){
        //                 fullDescription += $$(el).text().trim() + '\n\n';
        //             }else if (tag === 'ul'|| tag ==='ol'){
        //                 $$(el).find('li').each((_, li) => {
        //                     fullDescription += '- '+$$(li).text().trim() + '\n'
        //                 })
        //                 fullDescription += '\n'
        //             }
        //         })
        //         results.push({ name: item.name, description: fullDescription.trim() })
        //     } catch (error) {
        //         results.push({ name: item.name, description: 'Failed to fetch description.' });
        //     }
        // }

        fs.writeFileSync(CACHE_FILE, JSON.stringify(results, null, 2), 'utf8')
        console.log("Scraping complete. Results cached.");

        return results;
    } catch (err) {
        console.error(err)
        return { error: 'Failed to scrape topics.'}
    }
}

const bypassHotLink = async () => {
    // directory: {
    //     path: path.join(__dirname, '../public/images'), // adjust relative path as needed
    //     redirectToSlash: true,
    //     index: false,
    // }
        // const buffer = await response.arrayBuffer();
        // res.set('Content-Type', response.headers.get('content-type'))
        // res.send(Buffer.from(buffer));
}
module.exports = {
  scrapeListSkinCondition,
  bypassHotLink
};