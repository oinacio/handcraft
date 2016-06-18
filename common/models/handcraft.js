module.exports = function(Handcraft) {
    
    Handcraft.beforeRemote('create', function(context, user, next) {
    
    context.args.data.customerId = context.req.accessToken.userId;
    next();
  });

};
