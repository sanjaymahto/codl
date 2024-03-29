import React, { Component } from "react";
import Post from "./Post";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { fetchPosts } from "../actions/postActions";
import ChronoFilter from "./ChronoFilter";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

class FilteredPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      loading: false // will be true when ajax request is running
    };
  }

  componentWillMount() {
    this.setState({ loading: true }, () => {
      this.props
        .fetchPosts(
          {
            start: this.state.start,
            language: this.props.match.params.lang,
            chrono: this.props.match.params.chrono
          },
          ""
        )
        .then(() =>
          this.setState({
            loading: false
          })
        );
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.lang !== this.props.match.params.lang ||
      nextProps.match.params.chrono !== this.props.match.params.chrono
    ) {
      this.setState({ loading: true }, () => {
        this.props
          .fetchPosts(
            {
              language: nextProps.match.params.lang,
              chrono: nextProps.match.params.chrono
            },
            ""
          )
          .then(() =>
            this.setState({
              loading: false
            })
          );
      });
    }
  }

  fetchMoreData = () => {
    this.setState({
      start: this.props.posts.length
    });
    this.props.fetchPosts(
      {
        start: this.state.start,
        language: this.props.match.params.lang,
        chrono: this.props.match.params.chrono
      },
      "MORE"
    );
  };

  render() {
    const { loading } = this.state;
    let sortByNew =
      this.props.match.params.chrono === "new" ||
      typeof this.props.match.params.chrono === "undefined"
        ? true
        : false;
    const postItems = this.props.posts.map(post => (
      <PostsWrapper key={post.id}>
        <Link to={`/post/${post.id}`}>
          <Post data={post} isHidden={false} />
        </Link>
      </PostsWrapper>
    ));
    return (
      <div>
        <ChronoFilter
          lang={this.props.match.params.lang}
          sortByNew={sortByNew}
        />
        {loading ? (
          <Spinner />
        ) : (
          <InfiniteScroll
            dataLength={this.props.posts.length}
            next={this.fetchMoreData}
            hasMore={this.props.hasMore}
            loader={<h4 className="text-center">Loading...</h4>}
          >
            {postItems}
          </InfiniteScroll>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  hasMore: state.posts.hasMore
});

const mapDispatchToProps = {
  fetchPosts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilteredPosts);

const PostsWrapper = styled.div`
  a {
    text-decoration: none;
    color: inherit;
  }
`;
