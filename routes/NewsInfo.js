const express = require('express');
const router = express.Router();
const axios = require('axios');
const moment = require('moment')
const NewsInfo = require('../models/NewsInfo');

/*var stopwords = ['দু', 'একটি', 'নিজের', 'তারৈ', 'আমি', 'ঐ', 'আপনি', 'করিয়ে', 'তত', 'জন্য', 'যখন', 'হত', 'সেটাও', 'করার', 'ওঁদের', 'শুধু', 'তাহার', 'ওদের', 'দেওয়ার', 'নিজেই', 'আমার', 'দিলেন', 'ফিরে', 'গেলে', 'জানা', 'আপনার', 'তাঁর', 'উপর', 'তাকে', 'রয়েছে', 'যাকে', 'এঁরা', 'তাদের', 'সেই', 'হবেন', 'কোনও', 'অনুযায়ী', 'যান', 'তাও', 'পরেও', 'গেছে', 'অবধি', 'কয়েকটি', 'কাছে', 'এটি', 'আগেই', 'এতটাই', 'হইয়া', 'যা', 'হৈলে', 'আবার', 'তারা', 'সে', 'হয়েছে', 'সহিত', 'যাবে', 'তখন', 'গিয়েছে', 'দিয়ে', 'কিছুই', 'তবে', 'নিতে', 'রেখে', 'ই', 'সহ', 'যাঁরা', 'নানা', 'হলো', 'যাঁর', 'তোমার','পর', 'ছাড়াও', 'করলে', 'যত', 'তবু', 'তিনিও', 'না', 'দেখতে', 'দেওয়া', 'থেকেও', 'কাজে', 'ক্ষেত্রে', 'কয়েক', 'হচ্ছে', 'হয়েছিল', 'থেকেই', 'অথবা', 'সঙ্গেও', 'বদলে', 'দ্বারা', 'পক্ষে', 'গেল', 'বলতে', 'পাওয়া', 'কত', 'মধ্যে', 'বলা', 'জে', 'নেই', 'তাই', 'কি', 'সেটা', 'একে', 'যেখানে', 'এত', 'হলেও', 'টি', 'করেই', 'করছে', 'হন', 'প্রায়', 'মধ্যভাগে', 'কারণ', 'এবার', 'করেছে', 'করেন', 'আর', 'যেন', 'নিজেদের', 'হয়েই', 'নিজে', 'একবার', 'নাই', 'বাদে', 'যাতে', 'এর', 'ঠিক', 'তার', 'ও', 'পেয়ে', 'করলেন', 'মোট', 'ব্যাপারে', 'কাছ', 'করা', 'চেয়ে', 'কেউ', 'নাগাদ', 'করি', 'বলেছেন', 'নেওয়ার', 'কাউকে', 'ভাবে', 'দিকে', 'তারপর', 'যেমন', 'ওখানে', 'খুব', 'গুলি', 'অর্থাত', 'তো', 'ছিলেন', 'কোন', 'পারেন', 'হয়তো', 'বরং', 'কেউই', 'জনকে' , 'প্রভৃতি', 'দুটো', 'তাঁকে', 'এখন', 'অন্য', 'ওর', 'ছিল', 'ওকে', 'তুলে', 'দিয়েছে', 'জানানো', 'ওঁরা', 'এটাই' , 'তুমি', 'করিতে', ',তাহলে', 'দেন', 'বলে', 'যে', 'হলেই', 'এমনকী', 'হল', 'বহু', 'বলল', 'মধ্যেই', 'ধরে', 'তাঁদের', 'তেমন', 'আই', 'হইবে', 'তাহাতে', 'নেওয়া', 'যিনি', 'এঁদের', 'অনেকে', 'হতে', 'কে', 'ধরা', 'হইতে', 'করায়', 'ব্যবহার', 'থাকে', 'বসে', 'থাকেন', 'থাকবে', 'স্বয়ং', 'এরা', 'দেয়', 'নিয়ে', 'কবে', 'সবার', 'দেখে', 'চলে', 'যেতে', 'ইত্যাদি', 'সেখান', 'চান', 'অন্তত', 'হবে', 'সেটাই', 'পর্যন্ত', 'মাধ্যমে', 'এমন', 'ভাবেই', 'দিয়েছেন', 'ওরা', 'করে', 'তাতে', 'এবং', 'এতে', 'ইহা', 'জন্যওজে', 'সুতরাং', 'আমাকে', 'বিশেষ', 'এসে', 'করতে', 'এখানেই', 'আমরা', 'কিন্তু', 'তিনি', 'বিনা', 'আজ', 'কারও', 'করিয়া', 'তা', 'ছাড়া', 'থেকে', 'যারা', 'হয়', 'হওয়া', 'এল', 'মাত্র', 'ফের', 'জানতে', 'জানিয়ে', 'বললেন', 'মতোই', 'সাথে', 'কর', 'করেছেন', 'করবেন', 'হলে', 'নাকি', 'সঙ্গে', 'আগামী', 'এখনও', 'তাঁাহারা', 'দিতে', 'তাঁরা', 'আগে', 'আমাদের', 'সেটি', 'বলেন', 'স্পষ্ট', 'কোনো', 'হোক', 'থাকবেন', 'জন', 'করছেন', 'অবশ্য', 'গিয়ে', 'হয়নি', 'এখানে', 'করবে', 'কিছু', 'হওয়ায়', 'কখনও', 'যাদের', 'বার', 'হয়ে', 'পারি', 'জানিয়েছে', 'আদ্যভাগে', 'আরও', 'মতো', 'যায়', 'যাওয়ার', 'কিংবা', 'যদি', 'পরেই', 'জনের', 'হিসাবে', 'এস', 'দুটি', 'জানায়', 'গোটা', 'যাওয়া', 'তথা', 'সমস্ত', 'যদিও', 'করাই', 'হতেই', 'হয়েছেন', 'নয়', 'বিভিন্ন', 'বিষয়টি', 'রকম', 'অনেক', 'করেছিলেন', 'উপরে', 'এ', 'এদের', 'উনি', 'হয়', 'সব', 'পরে', 'প্রতি', 'যার', 'মধ্যেও', 'মোটেই', 'এই', 'বা', 'বেশ', 'পারে', 'যতটা', 'অনেকেই', 'যাচ্ছে', 'অথচ', 'অতএব', 'একই', 'দেখা', 'চায়', 'আছে', 'থাকায়', 'যথেষ্ট', 'কী', 'তাহা', 'রাখা', 'ওঁর', 'সেখানে', 'সম্প্রতি', 'তিনঐ', 'উচিত', 'হওয়ার', 'ফলে', 'ওই', 'কেন', 'থাকা', 'এটা']*/

var stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now', 'দু', 'একটি', 'নিজের', 'তারৈ', 'আমি', 'ঐ', 'আপনি', 'করিয়ে', 'তত', 'জন্য', 'যখন', 'হত', 'সেটাও', 'করার', 'ওঁদের', 'শুধু', 'তাহার', 'ওদের', 'দেওয়ার', 'নিজেই', 'আমার', 'দিলেন', 'ফিরে', 'গেলে', 'জানা', 'আপনার', 'তাঁর', 'উপর', 'তাকে', 'রয়েছে', 'যাকে', 'এঁরা', 'তাদের', 'সেই', 'হবেন', 'কোনও', 'অনুযায়ী', 'যান', 'তাও', 'পরেও', 'গেছে', 'অবধি', 'কয়েকটি', 'কাছে', 'এটি', 'আগেই', 'এতটাই', 'হইয়া', 'যা', 'হৈলে', 'আবার', 'তারা', 'সে', 'হয়েছে', 'সহিত', 'যাবে', 'তখন', 'গিয়েছে', 'দিয়ে', 'কিছুই', 'তবে', 'নিতে', 'রেখে', 'ই', 'সহ', 'যাঁরা', 'নানা', 'হলো', 'যাঁর', 'তোমার','পর', 'ছাড়াও', 'করলে', 'যত', 'তবু', 'তিনিও', 'না', 'দেখতে', 'দেওয়া', 'থেকেও', 'কাজে', 'ক্ষেত্রে', 'কয়েক', 'হচ্ছে', 'হয়েছিল', 'থেকেই', 'অথবা', 'সঙ্গেও', 'বদলে', 'দ্বারা', 'পক্ষে', 'গেল', 'বলতে', 'পাওয়া', 'কত', 'মধ্যে', 'বলা', 'জে', 'নেই', 'তাই', 'কি', 'সেটা', 'একে', 'যেখানে', 'এত', 'হলেও', 'টি', 'করেই', 'করছে', 'হন', 'প্রায়', 'মধ্যভাগে', 'কারণ', 'এবার', 'করেছে', 'করেন', 'আর', 'যেন', 'নিজেদের', 'হয়েই', 'নিজে', 'একবার', 'নাই', 'বাদে', 'যাতে', 'এর', 'ঠিক', 'তার', 'ও', 'পেয়ে', 'করলেন', 'মোট', 'ব্যাপারে', 'কাছ', 'করা', 'চেয়ে', 'কেউ', 'নাগাদ', 'করি', 'বলেছেন', 'নেওয়ার', 'কাউকে', 'ভাবে', 'দিকে', 'তারপর', 'যেমন', 'ওখানে', 'খুব', 'গুলি', 'অর্থাত', 'তো', 'ছিলেন', 'কোন', 'পারেন', 'হয়তো', 'বরং', 'কেউই', 'জনকে' , 'প্রভৃতি', 'দুটো', 'তাঁকে', 'এখন', 'অন্য', 'ওর', 'ছিল', 'ওকে', 'তুলে', 'দিয়েছে', 'জানানো', 'ওঁরা', 'এটাই' , 'তুমি', 'করিতে', ',তাহলে', 'দেন', 'বলে', 'যে', 'হলেই', 'এমনকী', 'হল', 'বহু', 'বলল', 'মধ্যেই', 'ধরে', 'তাঁদের', 'তেমন', 'আই', 'হইবে', 'তাহাতে', 'নেওয়া', 'যিনি', 'এঁদের', 'অনেকে', 'হতে', 'কে', 'ধরা', 'হইতে', 'করায়', 'ব্যবহার', 'থাকে', 'বসে', 'থাকেন', 'থাকবে', 'স্বয়ং', 'এরা', 'দেয়', 'নিয়ে', 'কবে', 'সবার', 'দেখে', 'চলে', 'যেতে', 'ইত্যাদি', 'সেখান', 'চান', 'অন্তত', 'হবে', 'সেটাই', 'পর্যন্ত', 'মাধ্যমে', 'এমন', 'ভাবেই', 'দিয়েছেন', 'ওরা', 'করে', 'তাতে', 'এবং', 'এতে', 'ইহা', 'জন্যওজে', 'সুতরাং', 'আমাকে', 'বিশেষ', 'এসে', 'করতে', 'এখানেই', 'আমরা', 'কিন্তু', 'তিনি', 'বিনা', 'আজ', 'কারও', 'করিয়া', 'তা', 'ছাড়া', 'থেকে', 'যারা', 'হয়', 'হওয়া', 'এল', 'মাত্র', 'ফের', 'জানতে', 'জানিয়ে', 'বললেন', 'মতোই', 'সাথে', 'কর', 'করেছেন', 'করবেন', 'হলে', 'নাকি', 'সঙ্গে', 'আগামী', 'এখনও', 'তাঁাহারা', 'দিতে', 'তাঁরা', 'আগে', 'আমাদের', 'সেটি', 'বলেন', 'স্পষ্ট', 'কোনো', 'হোক', 'থাকবেন', 'জন', 'করছেন', 'অবশ্য', 'গিয়ে', 'হয়নি', 'এখানে', 'করবে', 'কিছু', 'হওয়ায়', 'কখনও', 'যাদের', 'বার', 'হয়ে', 'পারি', 'জানিয়েছে', 'আদ্যভাগে', 'আরও', 'মতো', 'যায়', 'যাওয়ার', 'কিংবা', 'যদি', 'পরেই', 'জনের', 'হিসাবে', 'এস', 'দুটি', 'জানায়', 'গোটা', 'যাওয়া', 'তথা', 'সমস্ত', 'যদিও', 'করাই', 'হতেই', 'হয়েছেন', 'নয়', 'বিভিন্ন', 'বিষয়টি', 'রকম', 'অনেক', 'করেছিলেন', 'উপরে', 'এ', 'এদের', 'উনি', 'হয়', 'সব', 'পরে', 'প্রতি', 'যার', 'মধ্যেও', 'মোটেই', 'এই', 'বা', 'বেশ', 'পারে', 'যতটা', 'অনেকেই', 'যাচ্ছে', 'অথচ', 'অতএব', 'একই', 'দেখা', 'চায়', 'আছে', 'থাকায়', 'যথেষ্ট', 'কী', 'তাহা', 'রাখা', 'ওঁর', 'সেখানে', 'সম্প্রতি', 'তিনঐ', 'উচিত', 'হওয়ার', 'ফলে', 'ওই', 'কেন', 'থাকা', 'এটা']

function remove_stopwords(str) {
    res = []
    words = str.split(' ')
    for(i=0;i<words.length;i++) {
        word_clean = words[i].split(".").join("")
        if(!stopwords.includes(word_clean)) {
            res.push(word_clean)
        }
    }
    return(res.join(' '))
}

router.post('/vote', async(req, res) => {
    const {newsHeading, subHeading, newsLink, publishedDate, vote, comment} = req.body
    const news = await NewsInfo.findOne({newsLink}).exec()
    if(news){
        if(vote.toLowerCase().localeCompare('up') != 0 && vote.toLowerCase().localeCompare('down') != 0 ){
            return res.status(400).json({
                message: "You have to vote with 'up' or 'down'"
            }) 
        } else {
            if(vote.toLowerCase().localeCompare('up') == 0){
                news.upVote += 1
            } else if(vote.toLowerCase().localeCompare('down') == 0){
                news.downVote += 1
            }
            await news.save()
            return res.status(201).json({
                news,
                message: 'Your vote has been counted'
            })
        }
    }
    if(vote.toLowerCase().localeCompare('up') != 0 && vote.toLowerCase().localeCompare('down') != 0 ){
        return res.status(400).json({
            message: "You have to vote with 'up' or 'down'"
        })
    }
    upVote = 0
    downVote = 0
    if(vote.toLowerCase().localeCompare('up') == 0){
        upVote += 1
    } else if(vote.toLowerCase().localeCompare('down') == 0){
        downVote += 1
    }
    newsHeadingFilter = remove_stopwords(newsHeading)
    subHeadingFilter = remove_stopwords(subHeading)
    newsHeadingKeyword = newsHeadingFilter.split(' ');
    subHeadingKeyword = subHeadingFilter.split(' ');
    keyword = newsHeadingKeyword.concat(subHeadingKeyword);
    uniqueKeyword = keyword.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    })
    newsInfo = new NewsInfo({newsHeading, subHeading, newsLink, publishedDate, upVote, downVote, comment, keyword: uniqueKeyword})
    try{
        await newsInfo.save()

        return res.status(201).json({
            newsInfo,
            message: 'Your vote has been counted'
        })
    } catch(error){
        return res.status(400).json({
            message: error
        })
    }
})

router.post('/checkAuthenticate', async(req, res) => {
    const {newsHeading, subHeading, newsLink} = req.body
    newsHeadingFilter = remove_stopwords(newsHeading)
    subHeadingFilter = remove_stopwords(subHeading)
    newsHeadingKeyword = newsHeadingFilter.split(' ');
    subHeadingKeyword = subHeadingFilter.split(' ');
    keyword = newsHeadingKeyword.concat(subHeadingKeyword);
    uniqueKeyword = keyword.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    })
    var output = []
    await NewsInfo.find({}).then((newsInfo) =>{
        newsInfo.forEach((element) => {
          const intersection = uniqueKeyword.filter(keyword => element.keyword.includes(keyword));
          if((intersection.length * 100) / (uniqueKeyword.length) >= 70){
            output.push(element)
          }
        })
    }).catch((error) => {
        return res.status(404).json({
            message: error
        })
    })
    return res.status(201).json({
        output,
        message: 'Success'
    })
})

router.post('/searchFromAuthentic', async(req, res) => {
    const {newsHeading, subHeading, newsLink} = req.body
    var output = []
    today = moment(new Date()).format("YYYY-MM-DD")
    pastDay = moment(today).subtract(7, 'days');
    pastDay = moment(pastDay).format("YYYY-MM-DD")
    await axios.get('http://newsapi.org/v2/everything?q='+newsHeading+'&from='+today+'&to='+pastDay+'&'+'sortBy=popularity&apiKey='+process.env.NEWS_API_KEY).then((response) => {
        output.push(response.data.articles)
      }).catch((error) => {
        console.log(error);
    })
    return res.status(201).json({
        output,
        message: 'Success'
    })
})

module.exports = router;