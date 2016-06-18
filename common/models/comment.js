module.exports = function(Comment) {

    Comment.beforeRemote('create', function(context, user, next) {

        context.args.data.publisherId = context.req.accessToken.userId;
    next();
  });

};
