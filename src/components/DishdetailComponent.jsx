import React, { Component } from "react"
import moment from 'moment'
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Label, Button, Row, Col } from "reactstrap"
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Link } from 'react-router-dom'

// ------- CommentForm Component with Model and Comments Field ------- //
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false
    }
    this.toggleCommentModal = this.toggleCommentModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  toggleCommentModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  handleSubmit(values) {
    console.log('Current State is: ' + JSON.stringify(values))
    alert('Current State is: ' + JSON.stringify(values))
  }

  render() {
    return (
      <>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleCommentModal}>
          <ModalHeader toggle={this.toggleCommentModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <Row className='form-group'>
                <Col md={12}>
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select
                    className='form-control'
                    model=".rating"
                    name="rating"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className='form-group'>

                <Col md={12}>
                  <Label htmlFor="yourname" >Your Name</Label>
                  <Control.text
                    className='form-control'
                    model=".yourname"
                    id="yourname"
                    name="yourname"
                    placeholder="Your Name"
                    validators={{
                      required, minLength: minLength(3), maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".yourname"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </Col>
              </Row>
              <Row className='form-group'>
                <Col md={12}>
                  <Label htmlFor="comment">Comment</Label>
                  <Control.textarea
                    className='form-control'
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="12"
                  />
                </Col>
              </Row>
              <Row className='form-group'>
                <Col md={12}>
                  <Button type="submit" color="primary">Submit</Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
        {this.props.comments &&
          <div>
            <h4>Comments</h4>
            <ul className="list-unstyled">
              {this.props.comments.map(comment => {
                return (
                  <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, ${moment(comment.date).format('MMM d, YYYY')}</p>
                  </li>
                )
              })}
            </ul>
            <button className="comment_btn" onClick={this.toggleCommentModal}>
              <span className="fa fa-pencil" aria-hidden="true"></span> Submit Comment</button >
          </div>}
      </>
    )
  }
}

function RenderDish({ dish, }) {
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
            <CommentForm comments={comments} />
          </div>
        </div>
      </div>
    );
  else return (
    <div></div>
  )
}

export default DishDetail
