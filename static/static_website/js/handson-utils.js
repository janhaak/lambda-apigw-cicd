AWS.config.region = HandsonConfig.region;
AWSCognito.config.region = HandsonConfig.region;

var TargetUserPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool({
    UserPoolId: HandsonConfig.userPoolId,
    ClientId: HandsonConfig.appClientId
});

/**
 * Confirm sign-in status
 */
var SignInStatus = {
    currentCognitoUser: TargetUserPool.getCurrentUser(),
    lastIdentityToken: null,
    lastAccessToken: null
};

(function() {
    var currentPage = location.pathname.substr(location.pathname.lastIndexOf('/') + 1);
    if (!SignInStatus.currentCognitoUser) {
        console.log("Not logged in.");
        if (currentPage == 'mypage.html') {
            $(location).attr('href', 'index.html');
        }
        return null;
    }
    SignInStatus.currentCognitoUser.getSession(function(err, session){
        if (err) {
            SignInStatus.currentCognitoUser.clearCachedTokens();
            SignInStatus.lastIdentityToken = null;
            SignInStatus.lastAccessToken = null;
            SignInStatus.currentCognitoUser = null;
            return;
        }
        SignInStatus.lastIdentityToken = session.getIdToken().getJwtToken();
        SignInStatus.lastAccessToken = session.getAccessToken().getJwtToken();
        if (SignInStatus.lastIdentityToken) {
            if (currentPage == 'index.html') {
                $(location).attr('href', 'mypage.html');
            }
        }
    });
})();

/**
 * Utilities
 */
var lockForm = function(form, lock) {
    form.find(':input, button').attr('disabled', lock);
};

var clearForm = function(form) {
    form.find('input').val('');
};

var updateTextArea = function(textArea, newValue) {
    textArea.val(newValue);
    textArea.attr('rows', textArea.val().split("\n").length);
}
