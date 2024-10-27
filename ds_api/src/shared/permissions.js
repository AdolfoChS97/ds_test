const permissions = {
    'admin': '*',
    "content-creator": {
        allowedMethod: ['POST'],
        allowedPaths: ['/content', '/themes']
    },
    'reader': {
        allowedMethod: ['GET'],
        allowedPaths: ['/content', '/themes']
    }
}

module.exports = permissions