const pages = require("./pages/pages");

export const routeSettings = [
    {
        component : pages.PostList,
        path : "/posts",
    },
    {
        component : pages.Post,
        path : "/post/:postId",
    },
    {
        component : pages.PostEditor,
        path : "/editor/:postId?",
    },
    {
        component : pages.ErrorReport
    }
];
