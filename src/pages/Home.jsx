import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from 'semantic-ui-react'

import PostCard from '../components/PostCard'
import { AuthContext } from '../context/Auth'
import PostForm from '../components/PostForm'
import { FETCH_POSTS_QUERY } from '../utils/graphql'

function Home() {
  const { user } = useContext(AuthContext)
  const { loading, data } = useQuery(FETCH_POSTS_QUERY)



  return (
    <Grid columns={3} divided>
      <Grid.Row className='page_title'>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
            <Transition.Group>
              {
                data && data.getPosts.map(item => (
                  <Grid.Column key={item.id} style={{ marginBottom: 20 }}>
                    <PostCard post={item} />
                  </Grid.Column>
                ))
              }
            </Transition.Group>
          )}
      </Grid.Row>
    </Grid>
  );
}



export default Home;
