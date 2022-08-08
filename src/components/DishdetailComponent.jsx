import React from "react"
import moment from 'moment'
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap"
import { Link } from 'react-router-dom'
// import { DISHES } from "../shared/dishes"

function RenderDish({ dish }) {
  return (
    <div>
      <Card>
        <CardImg top src={dish.image} alt=''></CardImg>
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  )
}

function RenderComments({ comments }) {
  if (comments != null) return (
    <div>
      <h4>Comments</h4>
      <ul className="list-unstyled">
        {comments.map(comment => {
          return (
            <li key={comment.id}>
              <p>{comment.comment}</p>
              <p>-- {comment.author} , ${moment(comment.date).format('MMM d, YYYY')}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const DishDetail = ({ dish, comments }) => {

  if (dish != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={comments} />
          </div>
        </div>
      </div>
    );
  else return (
    <div></div>
  )
}

export default DishDetail
