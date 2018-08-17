import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
//modal
import Modal from 'react-modal';
import ModalView from '../../modals/editBookModal/editBookModal'
Modal.setAppElement('#root');


export default (props) => {
    let notFoundImage = 'http://www.51allout.co.uk/wp-content/uploads/2012/02/Image-not-found.gif';
    let { title, id, images } = props;
    let image = notFoundImage;
    if (images && images[0] && images[0].smallThumbnail) {
        image = images[0].smallThumbnail;
    }
    return (
        <Grid item xs={12} sm={6} lg={4} xl={3} key={id}>
            <Modal
                isOpen={props.modalIsOpen}
                onAfterOpen={props.afterOpenModal}
                onRequestClose={props.closeModal}
                className="Modal"
                overlayClassName="Overlay"
                contentLabel="Minimal Modal Example"
            >
                <ModalView props={props}/>
            </Modal>
            <Slide in={props.appLoaded} timeout={Math.floor(Math.random() * 1500)}>
                <Card className="BookCard">
                    {image &&
                        <CardMedia style={{ height: 0, paddingTop: '55%' }}
                            image={image}
                            title={title}
                        >
                            {/* <img src={image} style={{height: '100px',width:'100px'}}/> */}
                        </CardMedia>
                    }
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {title}
                        </Typography>
                        <Typography gutterBottom component="h3">
                            {props.authors}
                        </Typography>
                        <Typography gutterBottom component="p">
                            {props.publishedDate}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={props.openModal}>
                            Edit
                    </Button>
                        <Button size="small" color="primary" onClick={props.delete}>
                            delete
                        </Button>
                    </CardActions>
                </Card>
            </Slide>
        </Grid>
    )

}