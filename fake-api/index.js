const pluralize = require('pluralize');
const util = require('util');
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// https://github.com/jimschubert/json-server-many-to-many/blob/master/index.js

// Includes one or more many-to-many relationships into `obj`. `resource` is provided for the known side of the association.
function includeOld(obj, resource, includes) {
    if(util.isNullOrUndefined(obj)) return;

    includes && [].concat(includes)
        .forEach((relationship) => {
            if (router.db.get(relationship).value) {
                let singularResource = pluralize.singular(resource);
                let singularRelationship = pluralize.singular(relationship);
                let manyMany = null;

                // this table lookup could be cached

                if(`${singularResource}_${singularRelationship}` in router.db.__wrapped__) {
                    // e.g. user_group
                    manyMany = `${singularResource}_${singularRelationship}`;
                } else if (`${singularRelationship}_${singularResource}` in router.db.__wrapped__) {
                    // e.g. group_user
                    manyMany = `${singularRelationship}_${singularResource}`;
                } else if (`${resource}_${relationship}` in router.db.__wrapped__) {
                    // e.g. users_groups
                    manyMany = `${resource}_${relationship}`;
                } else if (`${relationship}_${resource}` in router.db.__wrapped__) {
                    // e.g. groups_users
                    manyMany = `${relationship}_${resource}`;
                }

                if(manyMany == null) return;

                // assumes many-many tables are firstId, secondId relations.
                const relationshipKey = `${singularRelationship}Id`;
                const resourceKey = `${singularResource}Id`;

                const joinQuery = {};
                joinQuery[resourceKey] = obj.id;

                const items = router.db.get(manyMany).filter(joinQuery).value();
                if(util.isNullOrUndefined(items)) {
                    // not found
                    obj[relationship] = [];
                    return;
                }
                const ids = items.map((item) => item[relationshipKey]);

                const related = router.db.get(relationship).filter((elem) => {
                    return ids.includes(elem.id);
                }).value();

                obj[relationship] = related;
            }
        });
}

function include(obj, resource, includes) {
    if (!obj) {
        return;
    }

    includes && [includes]
        .forEach(() => {

        })
}

// This is fairly generic and should work for almost all endpoints. This could be more intuitive limited to only GET.
server.use('/:resource/:id*?', (req, res, next) => {
    let _include = req.query._include;
    delete req.query._include;

    // Only apply this middleware if we have a resource and _include query parameter.
    if(_include && req.params.resource && router.db.get(req.params.resource).value) {
        const results = res.locals.data || 
            (req.params.id && router.db.get(req.params.resource).getById(req.params.id).cloneDeep().value()) || 
            router.db.get(req.params.resource).cloneDeep().value();
        
        results && [].concat(results).forEach((result) => {
            include(result, req.params.resource, _include);
        });

        res.locals.data = results;
        // note: not return next(); because json-server doesn't check for 
        // pre-existing res.locals.data, or some other odd behavior.
        return router.render(req,res);
    }
    next();
});

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('\x1b[32mFor mock data thanks to https://dummyjson.com/\n');
  console.log('JSON Server is running')
})