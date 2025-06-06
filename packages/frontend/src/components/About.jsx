import { NavBar } from "./Navbar";
import Footer from "./Footer";

const AboutPage = () => {
  return (
    <div className="about-page">
      <NavBar />
      <div className="about-body">
        <div className="about-content">
          <h1>About Us</h1>
          <div className="about-content-description">
            <p>
            Welcome to Lomi,where the food is hot, the staff is mildly
            caffeinated, and the Wi-Fi password is “sambrrrruuuusa.”
          </p>
          <p>
            Founded in a fit of hunger and ambition, our restaurant was born out
            of a simple idea: what if we made food so good, people would stop
            texting at the table and actually talk to each other? (Spoiler: they
            still don’t. But hey, the food’s amazing.)
          </p>
          <p>
            Our chefs are culinary ninjas, trained in the ancient art of “making
            it up as they go,” and somehow, it works. Everything on the menu has
            been taste-tested hundreds of times—mostly by us, and occasionally
            by a stray dog that broke into the kitchen once.
          </p>
          <p>
            We pride ourselves on using fresh, locally-sourced ingredients,
            unless it’s raining—then we use whatever we found in the back of the
            fridge. Our recipes are crafted with love, sarcasm, and probably
            butter.
          </p>
          <p>
            So whether you're here for a quick bite, a long meal, or just to
            pretend you’re on a date with your phone, we’re glad you stopped by.
            Come hungry. Leave happy. Or at least full.
          </p>
          <p>
            And remember: calories don't count if you don't look at them
            directly.
          </p>
          <p>Bon appétit,</p>
          <p>
            <strong>The Lomi Team</strong>
            <br></br>
            <em>(And,yes, we do accept bribes in the form of compliments.)</em>
          </p>
          <div class="signoff">
            <p class="greeting">Bon appétit,</p>
            <p class="team-name">The Lomi Team</p>
            <p class="tagline">
              (And,yes, we do accept bribes in the form of compliments.)
            </p>
          </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
