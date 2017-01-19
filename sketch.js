/*
Reading The NYTimes
ICM Assignment
19 October 2016
stephaniekoltun@nyu.edu

Identifying word type in the New York Time's most emailed articles, grouped by different sections

==========
*/

var opac = "0.2";

var nouns;
var verbs;
var adverbs;
var adjectives;


// Run the API call
function search(section) {
    var section = section;
    var timeperiod = '1';



    var url = "https://api.nytimes.com/svc/mostpopular/v2/mostemailed/" + section + "/" + timeperiod + ".json";
    url += '?' + $.param({
        'api-key': apiKey
    });
    $.ajax({
        url: url,
        method: 'GET',
    }).done(function(result) {

        if (section == "arts") {
            parseResult(result, "#arts");
        }

        if (section == "business") {
            parseResult(result, "#business");
        }

        if (section == "sports") {
            parseResult(result, "#sports");
        }

        if (section == "technology") {
            parseResult(result, "#tech");
        }


    }).fail(function(err) {
        throw err;
    });
}


function parseResult(data, section) {

    var sectionContainer = select(section);

    var articles = data.results;

    for (var i = 0; i < articles.length / 2; i++) {
        var artTitle = replaceText(articles[i].title);
        var abstract = replaceText(articles[i].abstract);
        var byline = articles[i].byline;

        var newDiv = createDiv("");
        newDiv.class("article");
        newDiv.parent(sectionContainer);


        var heading = createP(artTitle);
        heading.parent(newDiv);
        heading.class("title");

        var bylineAdd = createP(byline);
        bylineAdd.parent(newDiv);

        var paragraph = createP(abstract);
        paragraph.parent(newDiv);

    }


}


function replaceText(text) {

    var words = text.split(' ');

    var newContent = "";

    for (var i = 0; i < words.length; i++) {
        var tags = RiTa.getPosTags(words[i]);
        var wordType = tags[0];
        var classType = "";

        // check if word is a noun
        if (wordType == "nn" || wordType == "nns") {
            classType = "noun";
        } else if (wordType == "nnp" || wordType == "nnps") {
            classType = "noun-prop";
        } else if (wordType == "prp" || wordType == "prp$" || wordType == "wp" || wordType == "wp$") {
            classType = "pronoun"
        } else if (wordType == "jj" || wordType == "jjr" || wordType == "jjs") {
            classType = "adjective";
        } else if (wordType == "vb" || wordType == "vbd" || wordType == "vbg" || wordType == "vbn" || wordType == "vbp" || wordType == "vbz") {
            classType = "verb";
        } else if (wordType == "rb" || wordType == "rbr" || wordType == "rbs") {
            classType = "adverb";
        } else if (wordType == "in" || wordType == "dt" || wordType == "cc" || wordType == "ex" || wordType == "prp") {
            classType = "other";
        }

        newContent = newContent + "<span class='" + classType + "'>" + words[i] + "</span> ";
    }

    return newContent;
}






function setup() {

    noCanvas();

    // set up event listeners
    var nounHeader = select('#noun');
    nounHeader.mouseOver(selectNouns);
    nounHeader.mouseOut(selectNone);

    var nounProperHeader = select('#noun-prop');
    nounProperHeader.mouseOver(selectNounsProper);
    nounProperHeader.mouseOut(selectNone);

    var pronounHeader = select('#pronoun');
    pronounHeader.mouseOver(selectPronouns);
    pronounHeader.mouseOut(selectNone);

    var verbHeader = select('#verb');
    verbHeader.mouseOver(selectVerbs);
    verbHeader.mouseOut(selectNone);

    var adjHeader = select('#adjective');
    adjHeader.mouseOver(selectAdjectives);
    adjHeader.mouseOut(selectNone);

    var advHeader = select('#adverb');
    advHeader.mouseOver(selectAdverbs);
    advHeader.mouseOut(selectNone);


    //parseArticle('#arts');
    search("arts");
    search("business");
    search("sports");
    search("technology");

}

function draw() {

}

function selectNouns() {
    $('#noun').css({
        "background": "#000000",
        "color": "#FFFFFF"
    });

    $('.noun').css("color", "#FFFFFF");

    $(".noun-prop, .pronoun, .verb, .adverb, .adjective, .other").css("opacity", opac).addClass("resetWord");
}


function selectNounsProper() {
    $('#noun-prop').css({
        "background": "#000000",
        "color": "#FFFFFF"
    });

    $('.noun-prop').css("color", "#FFFFFF");

    $(".noun, .verb, .pronoun, .adverb, .adjective, .other").css("opacity", opac).addClass("resetWord");
}


function selectPronouns() {
    $('#pronoun').css({
        "background": "#000000",
        "color": "#FFFFFF"
    });

    $('.pronoun').css("color", "#FFFFFF");

    $(".noun, .noun-prop, .verb, .adverb, .adjective, .other").css("opacity", opac).addClass("resetWord");
}

function selectVerbs() {
    $('#verb').css({
        "background": "#000000",
        "color": "#FFFFFF"
    });

    $('.verb').css("color", "#FFFFFF");

    $(".noun, .noun-prop, .pronoun, .adverb, .adjective, .other").css("opacity", opac).addClass("resetWord");
}

function selectAdjectives() {
    $('#adjective').css({
        "background": "#000000",
        "color": "#FFFFFF"
    });

    $('.adjective').css("color", "#FFFFFF");

    $(".noun-prop, .pronoun, .verb, .adverb, .noun, .other").css("opacity", opac).addClass("resetWord");
}

function selectAdverbs() {
    $('#adverb').css({
        "background": "#000000",
        "color": "#FFFFFF"
    });

    $('.adverb').css("color", "#FFFFFF");

    $(".noun-prop, .pronoun, .verb, .noun, .adjective, .other").css("opacity", opac).addClass("resetWord");
}

function selectNone() {

    $('#noun, #noun-prop, #pronoun, #verb, #adjective, #adverb').css({
        "background": "#FFF",
        "color": "#000"
    });

    $(".pronoun, .noun-prop, .verb, .noun, .adjective, .adverb, .other").css("opacity", "1").removeClass("resetWord");


    $('.noun').css("color", "#6C5B7B");
    $('.verb').css("color", "#355C7D");
    $('.noun-prop').css("color", "#5C2B5B");
    $('.adverb').css("color", "#F67280");
    $('.adjective').css("color", "#F8B195");
    $('.pronoun').css("color", "#AC3B7B");


}
