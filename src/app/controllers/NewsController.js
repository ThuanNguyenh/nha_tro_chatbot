
class NewsController  {

    // [GET] / news -- function handler
    index(req, res) {
        res.render('news');
    }

    // [GET] /news/:slug
    show(req, res){
        res.send('news detail!!');
    }

}

// tạo một đối tượng NewsController và exports ra ngoài
module.exports = new NewsController;