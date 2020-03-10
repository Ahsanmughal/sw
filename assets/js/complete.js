$.typeahead({
    input: '.js-typeahead-country_v1',
    minLength: 3,
    dynamic: true,
    // delay: 500,
    backdrop: {
        "background-color": "#fff"
    },
    template: function(query, item) {                
        return '<span class="row">' +
            '<span class="id">{{name}} in {{type}}</span>' +
        "</span>"
    },
    emptyTemplate: "no result for {{query}}",
    source: {
        user: {
            display: "name",
            ajax: function (query) {
                return {
                    type: "GET",
                    url: "https://backend.datafini.com/search/suggest/{{query}}",
                    callback: {
                        done: function (resp) {
                            var jsonarray = [];
                            if(resp.data.campaign) {
                                if(resp.data.campaign.length > 0) {
                                    for(let i = 0; i < resp.data.campaign.length; i++) {
                                        resp.data.campaign[i].name = resp.data.campaign[i].campaign_name;
                                        resp.data.campaign[i].type = "campaign";
                                        resp.data.campaign[i].url = campaign_url+resp.data.campaign[i].campaign_id;
                                        jsonarray.push(resp.data.campaign[i]);
                                    }
                                }
                            }
                            if(resp.data.stores) {
                                if(resp.data.stores.length > 0) {
                                    for(let j = 0; j < resp.data.stores.length; j++) {
                                        resp.data.stores[j].name = resp.data.stores[j].business_name;
                                        resp.data.stores[j].type = "store";
                                        resp.data.stores[j].url = brand_url+resp.data.stores[j].slug;
                                        jsonarray.push(resp.data.stores[j]);
                                    } 
                                }
                            }
                            if(resp.data.brands) {
                                if(resp.data.brands.length > 0) {
                                    for(let k = 0; k < resp.data.brands.length; k++ ) {
                                        resp.data.brands[k].name = resp.data.brands[k].business_name;
                                        resp.data.brands[k].type = "brand";
                                        resp.data.brands[k].url = brand_url+resp.data.brands[k].slug;
                                        jsonarray.push(resp.data.brands[k]);
                                    }
                                }
                            }
                            return jsonarray;
                        }
                    }
                }
            }
        }
    },
    callback: {
        onClick: function (node, a, item, event) {
            // You can do a simple window.location of the item.href
            //alert(JSON.stringify(item));
            window.location = item.url;
        },
        onSendRequest: function (node, query) {
            // console.log('request is sent')
        },
        onReceiveRequest: function (node, query) {
            // console.log('request is received')
        }
    },
    debug: true
});