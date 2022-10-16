import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { authenticate } from "../store";
import { useQuery } from "react-query";
import apiClient from "../../http-common";
import { useParams } from "react-router-dom";
import {PlusSquareIcon, MinusIcon} from "@chakra-ui/icons";
import { Button } from '@chakra-ui/react';
import { connect } from "react-redux";
// import { updateUser } from '../store';

const FavoriteButton = (props) => {
    const username = useSelector((state) => state.auth.username);
    const [like, setLike] = useState(false)
    const [favorites, setFavorites] = useState([])
    const handleClick = (evt) => {
        console.log("evt.target", evt.target)
        // setLike(!like);

}
    console.log('username', username)
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data } = useQuery(["query-single-object"], async () => {
        return await apiClient.get(
            `/object/${id}?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7`
            );
        });
        console.log('id', id)
        console.log('data', data)
        console.log('props', props)
        // let fav = data.data.objectid
        // console.log("fav", fav)

    if (username === undefined) {
        return (
            <p><span>
                <a href="/login">Log in to favorite this object!</a>
            </span></p>);
    }
    return(

        <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {/* {like ? "Unlike" : "Like"} */}
                </Button>
    )
    
}

const SetStateAndToggle = (props) => {

}

const mapStateToProps = state => ({
    username: state.auth.username,
    userId: state.auth.id,
    objects: state.auth.objects 
})

const mapDispatchToProps = dispatch => (
    {updateUser: id => dispatch(updateUser(id))}
)

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton)