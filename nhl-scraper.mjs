import {makeRequest} from "./xhr.mjs"

export default class NhlApiScraper {
    constructor(baseUrl, endpoints, years){
        this._endpoints = endpoints;
        this._years = years;
        this._baseUrl = baseUrl;
    }
    /** */
    async simpleRequest(url, method, responseType){
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.responseType = responseType;
        return await makeRequest(xhr);
    }
    
    /** NOTE: Promise.all fails if one the requests fails. */
    async getDraftData(){
        const requests = this._endpoints.map(async (url) => {
            return await this.simpleRequest(url, 'GET', 'json');
        });
        return await Promise.all(requests);
    }

    /** */
    async getProspectData(draftData, responseType){
        const requests = draftData.map(async (data) => {
            return await this.simpleRequest(data.url, 'GET', responseType);
        });
        return await Promise.all(requests);
    }
    enrichProspectData(){
        this.getDraftData()
            .then((allDraftYears) => {
                const draftData = allDraftYears.map((draftYear) => {
                    const prospectData = draftYear['drafts'][0]['rounds'].map((draftRound) => {
                        return draftRound['picks'].map((pick) => {
                            const prospectLink = this._baseUrl+pick['prospect']['link'];
                            const fn = pick['prospect']['fullName'];
                            const y = pick['year'];
                            const r = pick['round'];
                            const rn = pick['roundNumber'];
                            const po = pick['pickOverall'];
                            const pir =  pick['pickInRound'];
                            const t = pick['team']['name'];
                            return {fullName: fn, round: r, pickOverall: po, pickInRound:pir, url : prospectLink};
                        });
                    }).flat();
                    return prospectData;
                }).reduce((accum, x) => accum.concat(x),[]);
                const prospectData = this.getProspectData(draftData, 'json')
                return Promise.all([draftData, prospectData]);
            })
            .then((data) => {
                const draftData = data[0];
                const prospectData = data[1];
                const handleProspect = () => {}
                const finalProspectData = draftData.reduce((accum, val, idx) => {
                    //console.log(accum,val,idx);
                    const prospect = prospectData[idx]['prospects'][0];
                    const fn = prospect['firstName'];
                    const ln = prospect['lastName'];
                    const bd = prospect['birthDate'];
                    const h = prospect['height'];
                    const w = prospect['weight'];                  
                    const toAdd = {firstName: fn, lastName: ln, birthDate: bd, height: h, weight: w};
                    const combined = {...val, ...toAdd};
                    return accum.concat(combined)
                }, []);
                console.log(finalProspectData);
            }).catch((error) => {
                console.log(error);
            });
    }
}
