const permissions = {
    admin: '*',
    "content-creator": {
        allowedMethod: ['POST'],
        allowedPaths: ['/content', '/themes']
    }
}

module.exports = permissions