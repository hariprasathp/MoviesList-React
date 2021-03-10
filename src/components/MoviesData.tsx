import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Card, Header, Image, Grid } from "semantic-ui-react";
import jsonData from "./data/movies.json";
import InfiniteScroll from "react-infinite-scroll-component";
import Draggable from "react-draggable";

export const MoviesData: React.FC = () => {
  // Initialize range and length
  const range = 10;
  let length = range + 1;

  // Set default range for state
  const [state, setState] = useState(jsonData.slice(0, range));

  const fetchMoreData = () => {
    setTimeout(() => {
      setState(state.concat(jsonData.slice(length, state.length + range)));
      length += range;

      // Re-initialize length to 0 when it greater/equals jsonData
      if (length >= jsonData.length) {
        length = 0;
      }
    }, 1500);
  };

  return (
    <InfiniteScroll
      dataLength={state.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      <Card.Group itemsPerRow={5} style={{ padding: "2%" }}>
        {state.map((item, index) => (
          <Draggable
            axis="both"
            defaultPosition={{ x: 0, y: 0 }}
            grid={[25, 25]}
            scale={1}
            allowAnyClick
          >
            <Card key={index} fluid color="red" style={{ cursor: "grab" }}>
              <Image src={item.poster} size="medium" />
              <Card.Content>
                <Card.Header>{item.title}</Card.Header>
                <Card.Meta>
                  <span className="date">
                    Released on{" "}
                    {new Date(item.release_date * 1000).toLocaleString()}
                  </span>
                </Card.Meta>
                <Card.Description>{item.overview}</Card.Description>
              </Card.Content>
            </Card>
          </Draggable>
        ))}
      </Card.Group>
    </InfiniteScroll>
  );
};
