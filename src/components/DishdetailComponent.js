import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, Button, Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Row, Label, Col } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm , Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Stagger } from 'react-animation-components';

    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => (val) && (val.length >= len);

    function RenderComments({comments, postComment, dishId}){
        if(comments) {
            return( 
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul className='list-unstyled'>
                            {
                                <Stagger in>
                                    {comments.map((comment)=> {
                                        return ( <li key={comment.id}>
                                                    <div>                                                    
                                                        <p>{comment.comment}</p>                                                                                                        
                                                        <div>-- {comment.author} , {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</div>                                                    
                                                        <br/>
                                                    </div>
                                                </li>
                                        )
                                    })}
                                </Stagger>
                            }
                        </ul>
                        <CommentForm dishId={dishId} postComment={postComment} />
                    </div>
            );  
        }          
        return null;
    }

    function RenderDish({dish}){
        if(dish) {        
            return ( 
                    <div className="col-12 col-md-5 m-1">
                         <FadeTransform
                                in
                                transformProps={{
                                    exitTransform: 'scale(0.5) translateY(-50%)'
                                }}>
                                <Card>                       
                                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />                       
                                    <CardBody>
                                        <CardTitle tag="h3">{dish.name}</CardTitle>
                                        <CardText>{dish.description}</CardText>
                                    </CardBody>
                                </Card>
                        </FadeTransform>
                    </div>
            );
        }
        return null
    }

    const DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish){
            return (
                    <div className="container">
                        <div className="row">
                            <Breadcrumb>                                
                                <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>{props.dish.name}</h3>
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <RenderDish dish={props.dish} />
                            <RenderComments comments={props.comments} 
                                            postComment={props.postComment}
                                            dishId={props.dish.id} />
                        </div>
                    </div>
            );
        }
        return null;
    }

    class CommentForm extends Component {

        constructor(props){
            super(props);
            this.state = {      
                isModalOpen: false
            };

            this.toggleModal = this.toggleModal.bind(this);
        }

        toggleModal = () => {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
        }

        handleSubmit = (values) => {
            this.toggleModal();
            //this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        }

        render(){
            return (
                <React.Fragment>                    
                    <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <Col>
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                    <Row className="form-group">
                                        <Label htmlFor="rating" >Rating</Label>
                                        <Control.Select id="rating" name="rating" 
                                            model=".rating"
                                            className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>                                            
                                        </Control.Select>                                        
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="author" >Your Name</Label>
                                        <Control.Text id="author" name="author" 
                                            model=".author"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                minLength:minLength(2),maxLength:maxLength(15)                                                
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".name"
                                            show="touched"
                                            messages={{
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'                                        
                                            }}
                                        />
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="comment" >Comment</Label>
                                        <Control.Textarea id="comment" name="comment" 
                                            model=".comment"
                                            placeholder=""
                                            className="form-control"
                                            rows="6"
                                            validators={{
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".comment"
                                            show="touched"
                                            messages={{                                                
                                            }}
                                        />
                                    </Row>
                                    <Row className="form-group">
                                        <Button type="submit" value="submit" color="primary">Submit</Button>
                                    </Row>
                                </LocalForm>
                            </Col>
                        </ModalBody>
                    </Modal>
                </React.Fragment>
            );
        }
    }

export default DishDetail;