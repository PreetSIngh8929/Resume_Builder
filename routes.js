const passport = require("passport");
const express = require("express");
var router = express.Router();
const session = require("express-session");
const Resumes = require("./models/resume.js"),
  bodyParser = require("body-parser"),
  overriding = require("method-override");
var middleware = require("./middleware");
var User = require("./models/user.js");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(overriding("_method"));

router.get("/", function (req, res) {
  res.render("landing.ejs");
});

//Landing page of website
router.get("/landing", function (req, res) {
  res.render("landing.ejs");
});

router.get("/resume", function (req, res) {
  Resumes.find({}, function (err, allResumes) {
    if (err) {
      console.log(err);
    } else {
      res.render("resume/resume.ejs", {
        resumes: allResumes,
        currentUser: req.user,
      });
    }
  });
  // get the user out of session and pass to template
});

// New Resume Form Link
router.get("/resume/new/personal", middleware.isLoggedIn, (req, res) => {
  res.render("resume/personal");
});

//posting data from new resume to show page
router.post("/resume", middleware.isLoggedIn, function (req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var roll_no = req.body.roll_no;
  var email = req.body.email;
  var contact = req.body.contact;

  var degree_name = req.body.degree_name;
  var CGPA = req.body.CGPA;
  var Duration = req.body.Duration;
  var University_Name = req.body.University_Name;

  var board_12 = req.body.board_12;
  var per_12 = req.body.per_12;
  var pass_12 = req.body.pass_12;
  var school_12 = req.body.school_12;

  var board_10 = req.body.board_10;
  var per_10 = req.body.per_10;
  var pass_10 = req.body.pass_10;
  var school_10 = req.body.school_10;

  var ach_1 = req.body.ach_1;
  var ach_2 = req.body.ach_2;
  var ach_3 = req.body.ach_3;
  var ach_4 = req.body.ach_4;
  var ach_5 = req.body.ach_5;

  var hob_1 = req.body.hob_1;
  var hob_2 = req.body.hob_2;
  var hob_3 = req.body.hob_3;

  var lang_1 = req.body.lang_1;
  var lang_2 = req.body.lang_2;
  var lang_3 = req.body.lang_3;
  var lang_4 = req.body.lang_4;
  var lang_5 = req.body.lang_5;
  var lang_6 = req.body.lang_6;
  var lang_7 = req.body.lang_7;
  var lang_8 = req.body.lang_8;

  var proj_1 = req.body.proj_1;
  var proj_2 = req.body.proj_2;
  var proj_3 = req.body.proj_3;

  var projd_1 = req.body.projd_1;
  var projd_2 = req.body.projd_2;
  var projd_3 = req.body.projd_3;

  var plink_1 = req.body.plink_1;
  var plink_2 = req.body.plink_2;
  var plink_3 = req.body.plink_3;

  var link_1 = req.body.link_1;
  var link_2 = req.body.link_2;
  var link_3 = req.body.link_3;
  var link_4 = req.body.link_4;
  var hlink_1 = req.body.hlink_1;
  var hlink_2 = req.body.hlink_2;
  var hlink_3 = req.body.hlink_3;
  var hlink_4 = req.body.hlink_4;
  var author = {
    googleId: req.user.googleId,
    name: req.user.name,
  };

  var newResume = {
    name: name,
    roll_no: roll_no,
    email: email,
    contact: contact,
    degree_name: degree_name,
    CGPA: CGPA,
    Duration: Duration,
    University_Name: University_Name,
    board_12: board_12,
    per_12: per_12,
    pass_12: pass_12,
    school_12: school_12,
    board_10: board_10,
    per_10: per_10,
    pass_10: pass_10,
    school_10: school_10,
    ach_1: ach_1,
    ach_2: ach_2,
    ach_3: ach_3,
    ach_4: ach_4,
    ach_5: ach_5,
    hob_1: hob_1,
    hob_2: hob_2,
    hob_3: hob_3,
    lang_1: lang_1,
    lang_2: lang_2,
    lang_3: lang_3,
    lang_4: lang_4,
    lang_5: lang_5,
    lang_6: lang_6,
    lang_7: lang_7,
    lang_8: lang_8,
    proj_1: proj_1,
    proj_2: proj_2,
    proj_3: proj_3,
    projd_1: projd_1,
    projd_2: projd_2,
    projd_3: projd_3,
    plink_1: plink_1,
    plink_2: plink_2,
    plink_3: plink_3,
    link_1: link_1,
    link_2: link_2,
    link_3: link_3,
    link_4: link_4,
    hlink_1: hlink_1,
    hlink_2: hlink_2,
    hlink_3: hlink_3,
    hlink_4: hlink_4,
    author: author,
  };

  // Create a new campground and save to DB
  Resumes.create(newResume, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page
      req.flash("success", "New Resume Created");
      res.redirect("/resume");
    }
  });
});

//View Resumes//
router.get("/resume/pro/:id", middleware.isLoggedIn, function (req, res) {
  //find the resume with provided ID
  Resumes.findById(req.params.id, function (err, foundResume) {
    if (err || !foundResume) {
      req.flash("error", "Campground Not Found");
      res.redirect("back");
    } else {
      console.log(foundResume);
      // render show template with that resume
      res.render("resume/show", { resume: foundResume });
    }
  });
});

// router.get("/register",function(req,res){
// 	res.render("register.ejs");
// });

// router.post("/register",function(req,res){
// 	var newUser=new User({username:req.body.username});
// 	User.register(newUser,req.body.password,function(err,user){
// 		if(err){
// 			req.flash("error",err.message);
// 			res.redirect("/register");
// 		}
// 		else{
// 			passport.authenticate("local")(req,res,function(){
// 				req.flash("success","Welcome to Resume Builder "+ user.username);
// 				res.redirect("/resume");
// 			});
// 		}
// 	});
// });

// router.get("/login",function(req,res){
// 	res.render("login.ejs",{message:req.flash("error")});
// });

// router.post("/login",passport.authenticate("local",
// {
// 	successRedirect:"/resume",
// 	failureRedirect:"/login",
// 	failureFlash: true
// }
// ),function(req,res){

// });

router.get("/resume/normal/:id", middleware.isLoggedIn, function (req, res) {
  //find the resume with provided ID
  Resumes.findById(req.params.id, function (err, foundResume) {
    if (err || !foundResume) {
      res.redirect("back");
    } else {
      console.log(foundResume);
      // render show template with that resume
      res.render("resume/show_normal", { resume: foundResume });
    }
  });
});

//edit routes//
router.get("/resume/pro/:id/edit", function (req, res) {
  //find the resume with provided ID
  Resumes.findById(req.params.id, function (err, foundResume) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundResume);
      // render show template with that resume
      res.render("resume/edit", { resume: foundResume });
    }
  });
});
router.get("/resume/normal/:id/edit", function (req, res) {
  //find the resume with provided ID
  Resumes.findById(req.params.id, function (err, foundResume) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundResume);
      // render show template with that resume
      res.render("resume/editnormal", { resume: foundResume });
    }
  });
});

router.put("/resume/pro/:id", function (req, res) {
  Resumes.findByIdAndUpdate(
    req.params.id,
    req.body.resume,
    function (err, updatedResumes) {
      if (err) {
        req.flash("error", err.message);
        res.redirect("/resume");
      } else {
        req.flash("success", "Successfully Updated Resume");
        res.redirect("/resume/pro/" + req.params.id);
      }
    }
  );
});

router.put("/resume/normal/:id", function (req, res) {
  Resumes.findByIdAndUpdate(
    req.params.id,
    req.body.resume,
    function (err, updatedResumes) {
      if (err) {
        req.flash("error", err.message);
        res.redirect("/resume");
      } else {
        req.flash("success", "Successfully Updated Resume");
        res.redirect("/resume/normal/" + req.params.id);
      }
    }
  );
});

//download routes//

router.get("/resume/normal/:id/download", function (req, res) {
  //find the resume with provided ID
  Resumes.findById(req.params.id, function (err, foundResume) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundResume);
      // render show template with that resume
      res.render("resume/downloadpreview_normal", { resume: foundResume });
    }
  });
});
router.get("/resume/pro/:id/download", function (req, res) {
  //find the resume with provided ID
  Resumes.findById(req.params.id, function (err, foundResume) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundResume);
      // render show template with that resume
      res.render("resume/downloadpreview", { resume: foundResume });
    }
  });
});

router.delete("/resume/pro/:id", function (req, res) {
  Resumes.findByIdAndDelete(
    req.params.id,
    req.body.resume,
    function (err, updatedResumes) {
      if (err) {
        req.flash("error", err.message);
        res.redirect("/resume");
      } else {
        req.flash("success", "Successfully Deleted Resume");
        res.redirect("/resume");
        // res.send("it worked");
      }
    }
  );
});
router.delete("/resume/normal/:id", function (req, res) {
  Resumes.findByIdAndDelete(
    req.params.id,
    req.body.resume,
    function (err, updatedResumes) {
      if (err) {
        req.flash("error", err.message);
        res.redirect("/resume");
      } else {
        req.flash("success", "Successfully Deleted Resume");
        res.redirect("/resume");
        // res.send("it worked");
      }
    }
  );
});

//google auth routes
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    res.render("landing.ejs");
  }
);

router.get("/auth/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/google");
});

module.exports = router;
