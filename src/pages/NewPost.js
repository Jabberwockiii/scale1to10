import React, { useCallback, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import parseLinkHeader from 'parse-link-header';
// src/App.js
import Typography from '@mui/material/Typography';
import { API, SortDirection } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { graphqlOperation } from 'aws-amplify';
import { TextField } from '@mui/material';
import {v4 as uuid}from 'uuid';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Auth } from 'aws-amplify';
import {useParams} from 'react-router-dom';
import { Divider, Avatar, Grid, Paper, Card } from "@material-ui/core";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

async function fetchIssues(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/vnd.github.v3+json'
    })
  });

  const links = parseLinkHeader(response.headers.get('Link'));
  const issues = await response.json();

  return {
    links,
    issues
  };
}

export default function App() {
  const [items, setItems] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(
    'https://api.github.com/repos/facebook/react/issues'
  );

  const [fetching, setFetching] = useState(false);
  const [comments, setComments] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  
  const fetchItems = useCallback(
    async () => {
      if (fetching) {
        return;
      }

      setFetching(true);

      try {
        const { issues, links } = await fetchIssues(nextPageUrl);

        setItems([...items, ...issues]);

        if (links.next) {
          setNextPageUrl(links.next.url);
        } else {
          setNextPageUrl(null);
        }
      } finally {
        setFetching(false);
      }
    },
    [items, fetching, nextPageUrl]
  );

  const hasMoreItems = !!nextPageUrl;

  const loader = (
    <div key="loader" className="loader">
      Loading ...
    </div>
  );

  return (
    <InfiniteScroll
      loadMore={fetchItems}
      hasMore={hasMoreItems}
      loader={loader}
    >
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <a href={item.url} target="_blank" rel="noopener">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  );
};
