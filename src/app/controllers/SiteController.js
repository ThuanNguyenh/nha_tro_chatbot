
class SiteController  {

    // [GET] / -- function handler
    home(req, res) {
        res.render('home');
    }

    

}

// tạo một đối tượng SiteController và exports ra ngoài
module.exports = new SiteController;