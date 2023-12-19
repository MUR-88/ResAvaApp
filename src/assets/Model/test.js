// import React, { useEffect, useState } from "react";
// import { View, Text } from "react-native";
// import database from "./database";
// import { Post } from "./models/Post";
// const App = () => {
//   const [posts, setPosts] = useState([]);
//   useEffect(() => {
//     const fetchPosts = async () => {
//       const postsCollection = database.get("posts");
//       const allPosts = await postsCollection.query().fetch();
//       setPosts(allPosts);
//     };
//     fetchPosts();
//   }, []);
//   return (
//     <View>
//       {" "}
//       {posts.map((post) => (
//         <Text key={post.id}>{post.title}</Text>
//       ))}{" "}
//     </View>
//   );
// };
// export default App;
