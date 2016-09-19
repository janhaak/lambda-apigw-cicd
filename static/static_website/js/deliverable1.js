
var publicAPICaller = function() {
    var ajax = function(callback) {

        var postData = {
            key3: "value3",
            key2: "value2",
            key1: "value1"
        };

        var endpoint = HandsonConfig.apiGWEndpoint + "/helloworld";
        $.ajax({
            type: "POST",
            url: endpoint,
            //data: postData,
            contentType: "application/json",
            complete: function(xhr, status) {
                console.log("Response: ")
                console.dir(xhr);
                var responseSummary = "Response status code: " + xhr.status + "\n" +
                                        "Response status text: " + xhr.statusText + "\n" +
                                        "(" + AWS.util.date.iso8601(new Date) + ")" + "\n" +
                                        xhr;
                callback(responseSummary);
            }
        });
    };

    return {
        code: ajax.toString(),
        call: function(callback) {ajax(callback)}
    };
};

var privateAPICaller_UserPools = function() {
    var ajax = function(callback) {
        var endpoint = HandsonConfig.apiGWEndpoint + "/userpool/private-contents";
        $.ajax({
            type: "GET",
            url: endpoint,
            contentType: "application/json",
            headers: {
                "Authorization": SignInStatus.lastIdentityToken
            },
            complete: function(xhr, status) {
                console.log("Response: ")
                console.dir(xhr);
                var responseSummary = "Response status code: " + xhr.status + "\n" +
                                        "Response status text: " + xhr.statusText + "\n" +
                                        "(" + AWS.util.date.iso8601(new Date) + ")";
                callback(responseSummary);
            }
        });
    };

    return {
        code: ajax.toString(),
        call: function(callback) {ajax(callback)}
    };
};
