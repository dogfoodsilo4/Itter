let flatbuffers = require('flatbuffers').flatbuffers;
let Specification = require('./Schemas/specification_generated').Specification;

// Converts a JSON internal specification to a flatbuffer
class SpecBuilder
{
    private builder: any;

    constructor()
    {
        this.builder = new flatbuffers.Builder(1024);
    }

    public BuildSpec(jsonSpec: any): any
    {
        let rootProduct = this.BuildProduct(jsonSpec);
        this.builder.finish(rootProduct);
        return this.builder.asUint8Array();
    }

    private BuildProduct(product: any): any
    {
        let fbProduct;
        if (product)
        {
            let meta = this.BuildMeta(product._meta);

            let productToProduct;
            if (product.Product_To_Product) {
                productToProduct = this.BuildProductToProducts(product.Product_To_Product);
            }
            let mappingRules;
            if(product.MappingRules){
                mappingRules = this.BuildMappingRules(product.MappingRules);
            }
            let Effective_Start_Date = this.SafeString(product.Effective_Start_Date);
            let Available_Start_Date = this.SafeString(product.Available_Start_Date);
            let Effective_End_Date = this.SafeString(product.Effective_End_Date);
            let Available_End_Date = this.SafeString(product.Available_End_Date);
            let Element_Guid = this.SafeString(product.Element_Guid);
            let Element_Type_Guid = this.SafeString(product.Element_Type_Guid);
            let Business_ID = this.SafeString(product.Business_ID);
            let Name = this.SafeString(product.Name);
            let Description = this.SafeString(product.Description);
            let Category_ID = this.SafeString(product.Category_ID);
            let Max_Cust_Portfolio_Instances = this.SafeString(product.Max_Cust_Portfolio_Instances);
            let Min_Cust_Portfolio_Instances = this.SafeString(product.Min_Cust_Portfolio_Instances);

            Specification.Product.startProduct(this.builder);

            Specification.Product.add_meta(this.builder, meta);

            Specification.Product.addEffectiveStartDate(this.builder, Effective_Start_Date);
            Specification.Product.addAvailableStartDate(this.builder, Available_Start_Date);
            Specification.Product.addEffectiveEndDate(this.builder, Effective_End_Date);
            Specification.Product.addAvailableEndDate(this.builder, Available_End_Date);
            Specification.Product.addElementGuid(this.builder, Element_Guid);
            Specification.Product.addElementTypeGuid(this.builder, Element_Type_Guid);
            Specification.Product.addBusinessID(this.builder, Business_ID);
            Specification.Product.addName(this.builder, Name);
            Specification.Product.addDescription(this.builder, Description);
            Specification.Product.addCategoryID(this.builder, Category_ID);
            Specification.Product.addMaxCustPortfolioInstances(this.builder, Max_Cust_Portfolio_Instances);
            Specification.Product.addMinCustPortfolioInstances(this.builder, Min_Cust_Portfolio_Instances);

            Specification.Product.addProductToProduct(this.builder, productToProduct);
            Specification.Product.addMappingRules(this.builder, mappingRules);

            fbProduct = Specification.Product.endProduct(this.builder);
        }
        return fbProduct;
    }

    private BuildMeta(meta: any): any
    {
        let fbMeta;
        if (meta)
        {
            let ID = this.SafeString(meta.ID);
            let name = this.SafeString(meta.name);
            let isTechnical = meta.isTechnical;
            let path = this.SafeString(meta.path);
            let OmniformName = this.SafeString(meta.OmniformName);
            let BusinessID = this.SafeString(meta.BusinessID);

            Specification.Meta.startMeta(this.builder);

            Specification.Meta.addID(this.builder, ID);
            Specification.Meta.addName(this.builder, name);
            Specification.Meta.addIsTechnical(this.builder, isTechnical);
            Specification.Meta.addPath(this.builder, path);
            Specification.Meta.addOmniformName(this.builder, OmniformName);
            Specification.Meta.addBusinessID(this.builder, BusinessID);

            fbMeta = Specification.Meta.endMeta(this.builder);
        }
        return fbMeta;
    }

    private BuildProductToProducts(productToProducts: any): any
    {
        let _this = this;
        let fbProductToProducts = [];
        if (productToProducts)
        {
            if (!Array.isArray(productToProducts))
            {
                productToProducts = this.asArray(productToProducts);
            }
            productToProducts.forEach((productToProduct: any)=>
            {

                let meta = _this.BuildMeta(productToProduct._meta);

                let product = _this.BuildProduct(productToProduct.Product);

                let Association_Start_Date = _this.SafeString(productToProduct.Association_Start_Date);
                let Association_End_Date = _this.SafeString(productToProduct.Association_End_Date);
                let Max_Occurs = productToProduct.Max_Occurs;
                let Min_Occurs = _this.SafeString(productToProduct.Min_Occurs);
                let Default_Cardinality = _this.SafeString(productToProduct.Default_Cardinality);

                Specification.Product_To_Product.startProduct_To_Product(_this.builder);

                Specification.Product_To_Product.add_meta(_this.builder, meta);
                Specification.Product_To_Product.addAssociationStartDate(_this.builder, Association_Start_Date);
                Specification.Product_To_Product.addAssociationEndDate(_this.builder, Association_End_Date);
                Specification.Product_To_Product.addMaxOccurs(_this.builder, Max_Occurs);
                Specification.Product_To_Product.addMinOccurs(_this.builder, Min_Occurs);
                Specification.Product_To_Product.addDefaultCardinality(_this.builder, Default_Cardinality);
                Specification.Product_To_Product.addProduct(_this.builder, product);

                fbProductToProducts.push(Specification.Product_To_Product.endProduct_To_Product(_this.builder));
            });
        }

        return Specification.Product.createProductToProductVector(this.builder, fbProductToProducts);
    }

    private BuildExists(exists: any): any
    {
        let fbExists= [];
        if (!Array.isArray(exists))
        {
            exists = this.asArray(exists);
        }
        exists.forEach((exist:any) => {
                let meta = this.BuildMeta(exist._meta);
                let entity = this.SafeString(exist.Entity);

                Specification.Exists.startExists(this.builder);

                Specification.Exists.add_meta(this.builder, meta);
                Specification.Exists.addEntity(this.builder, entity);

                fbExists.push(Specification.Exists.endExists(this.builder));
        });
        return Specification.Conditions.createExistsVector(this.builder, fbExists);
    }
    private BuildScope(scope: any): any
    {
        let meta = this.BuildMeta(scope._meta);
        let name = this.SafeString(scope.Name);
        let description = this.SafeString(scope.Description);
        let seq = this.SafeString(scope.Seq)

        Specification.Scope.startScope(this.builder);

        Specification.Scope.add_meta(this.builder, meta);
        Specification.Scope.addName(this.builder, name);
        Specification.Scope.addDescription(this.builder, description);
        Specification.Scope.addSeq(this.builder, seq);

        return Specification.Scope.endScope(this.builder);
    }
    private BuildConditions (conditions: any): any
    {
        let meta = this.BuildMeta(conditions._meta);
        let exists;
        if(conditions.Exists){
         exists = this.BuildExists(conditions.Exists);
        }
        let scope;
        if(conditions.Scope)
        {
            scope = this.BuildScope(conditions.Scope);
        }
        Specification.Conditions.startConditions(this.builder);

        Specification.Conditions.add_meta(this.builder, meta);
        Specification.Conditions.addExists(this.builder, exists);
        Specification.Conditions.addScope(this.builder, scope);

        return Specification.Conditions.endConditions(this.builder);
    }
    private BuildActions(actions: any): any
    {
        let meta = this.BuildMeta(actions._meta);
        let name = this.SafeString(actions.Name);
        let sequence = this.SafeString(actions.Sequence);
        let target = this.SafeString(actions.Target);

        Specification.Actions.startActions(this.builder);

        Specification.Actions.add_meta(this.builder, meta);
        Specification.Actions.addName(this.builder, name);
        Specification.Actions.addSequence(this.builder, sequence);
        Specification.Actions.addTarget(this.builder, target);

        return Specification.Actions.endActions(this.builder);
    }
    private BuildTriggerEvents (triggerEvents: any)
    {
        let meta = this.BuildMeta(triggerEvents._meta);
        let name = this.SafeString(triggerEvents.Name);

        Specification.TriggerEvents.startTriggerEvents(this.builder);

        Specification.TriggerEvents.add_meta(this.builder, meta);
        Specification.TriggerEvents.addName(this.builder, name);

        return Specification.TriggerEvents.endTriggerEvents(this.builder);
    }

    private BuildMappingRules(mappingRules: any): any
    {
        let fbmappingRuless = [];
        if (mappingRules)
        {
            if(!Array.isArray(mappingRules))
            {
                mappingRules = this.asArray(mappingRules);
            }
            mappingRules.forEach((mappingRule: any) =>
            {
                let meta = this.BuildMeta(mappingRule._meta);

                let name = this.SafeString(mappingRule.Name);
                let sequence = this.SafeString(mappingRule.Sequence);
                let conditions;
                if(mappingRule.Conditions)
                {
                   conditions = this.BuildConditions(mappingRule.Conditions);
                }
                let triggerEvents = this.BuildTriggerEvents(mappingRule.TriggerEvents);
                let actions = this.BuildActions(mappingRule.Actions);

                Specification.MappingRules.startMappingRules(this.builder);

                Specification.MappingRules.add_meta(this.builder, meta);
                Specification.MappingRules.addName(this.builder, name);
                Specification.MappingRules.addSequence(this.builder, sequence);
                Specification.MappingRules.addConditions(this.builder,conditions);
                Specification.MappingRules.addTriggerEvents(this.builder, triggerEvents);
                Specification.MappingRules.addActions(this.builder, actions);

                fbmappingRuless.push(Specification.MappingRules.endMappingRules(this.builder));
            });
        }

        return Specification.Product.createMappingRulesVector(this.builder, fbmappingRuless);

    }

    private SafeString(str: string): string
    {
        if (!str) {
            return null;
        }
        return this.builder.createString(str);
    }

    private asArray(x : any): any[]
    {
        if (!x) {
            return [];
        }
        return [].concat.apply([], [x]);
    }
}
export = SpecBuilder;
