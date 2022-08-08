import { Component } from "react";
import Menu from "./MenuComponents";
import Header from "./HeaderComponent"
import Contact from "./ContactComponent"
import { DISHES } from "../shared/dishes"
import { COMMENTS } from "../shared/comments"
import DishDetail from './DishdetailComponent'
import { PROMOTIONS } from "../shared/promotions"
import { LEADERS } from "../shared/leaders";
import Home from './HomeComponent'
import Footer from "./FooterComponent"
import { Switch, Route, Redirect } from 'react-router-dom'
import About from "./AboutComponent";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS
    };
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.state.dishes.filter(dish => dish.featured)[0]}
          promotion={this.state.promotions.filter(promo => promo.featured)[0]}
          leader={this.state.leaders.filter(leader => leader.featured)[0]}
        />
      )
    }

    // Task 1 & 2 
    const AboutPage = () => {
      return (
        <About
          leadersList={this.state.leaders}
        />
      )
    }

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={this.state.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]}
          comments={this.state.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))} />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route exact path='/contactus' component={Contact} />
          <Route exact path='/aboutus' component={AboutPage} />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
