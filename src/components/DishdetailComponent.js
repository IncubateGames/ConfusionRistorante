import React from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom'

    function RenderComments({comments}){
        if(comments) {
            return( 
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul className='list-unstyled'>
                            {
                                comments.map((comment)=> {
                                    return ( <li key={comment.id}>
                                                <div>                                                    
                                                    <p>{comment.comment}</p>                                                                                                        
                                                    <div>-- {comment.author} , {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</div>                                                    
                                                    <br/>
                                                </div>
                                            </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
            );  
        }          
        return null;
    }

    function RenderDish({dish}){
        if(dish) {        
            return ( 
                    <div className="col-12 col-md-5 m-1">
                        <Card>                       
                            <CardImg width="100%" src={dish.image} alt={dish.name} />                       
                            <CardBody>
                                <CardTitle tag="h3">{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
            );
        }
        return null
    }

    const DishDetail = (props) => {
        console.log('DishDetail component invoke render');   
        if(props.dish){
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
                            <RenderComments comments={props.comments} />
                        </div>
                    </div>
            );
        }
        return null;
    }

export default DishDetail;