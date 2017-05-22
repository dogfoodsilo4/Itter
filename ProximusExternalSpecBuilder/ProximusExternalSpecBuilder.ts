let flatbuffers = require('flatbuffers').flatbuffers;
let Specification = require('./Proximus_Schemas/specification_generated').Specification;

// Converts a JSON internal specification to a flatbuffer
class SpecBuilder
{
    private builder: any;

    constructor()
    {
        this.builder = new flatbuffers.Builder(1000000);//1MB space?!!
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
            if(product.mappingRules){
                mappingRules = this.BuildMappingRules(product.mappingRules);
            }
            let com_Classification;
            if(product.COM_Classification)
            {
                com_Classification = this.BuildClassifications(product.COM_Classification);
            }
            let product_Line_Classification;
            if(product.Product_Line_Classification)
            {
                product_Line_Classification = this.BuildClassifications(product.Product_Line_Classification);
            }
            let market_Segment_Classification;
            if(product.Market_Segment_Classification)
            {
                market_Segment_Classification = this.BuildClassifications(product.Market_Segment_Classification);
            }
            let sales_Channel_Classification;
            if(product.Sales_Channel_Classification)
            {
                sales_Channel_Classification = this.BuildClassifications(product.Sales_Channel_Classification);
            }
            let Effective_Start_Date = this.SafeString(product.Effective_Start_Date);
            let Available_Start_Date = this.SafeString(product.Available_Start_Date);
            let Element_Guid = this.SafeString(product.Element_Guid);
            let Element_Type_Guid = this.SafeString(product.Element_Type_Guid);
            let Business_ID = this.SafeString(product.Business_ID);
            let Name = this.SafeString(product.Name);
            let Description = this.SafeString(product.Description);
            let Category_ID = this.SafeString(product.Category_ID);
            let Name_in_Dutch = this.SafeString(product.Name_in_Dutch);
            let Description_in_Dutch = this.SafeString(product.Description_in_Dutch);
            let Description_in_French = this.SafeString(product.Description_in_French);
            let Description_in_German = this.SafeString(product.Description_in_German);
            let Name_in_French = this.SafeString(product.Name_in_French);
            let Name_in_German = this.SafeString(product.Name_in_German);
            let Email_Required = this.SafeString(product.Email_Required);
            let Attachment_Required = this.SafeString(product.Attachment_Required);
            let Installation_Identifier_Required = this.SafeString(product.Installation_Identifier_Required);
            let Commercial_Name_in_English = this.SafeString(product.Commercial_Name_in_English);
            let Commercial_Name_in_French = this.SafeString(product.Commercial_Name_in_French);
            let Commercial_Name_in_Dutch = this.SafeString(product.Commercial_Name_in_Dutch);
            let Commercial_Name_in_German = this.SafeString(product.Commercial_Name_in_German);
            let Business_Code = this.SafeString(product.Business_Code);
            let Is_Sellable_Standalone = this.SafeString(product.Is_Sellable_Standalone);

            Specification.Product.startProduct(this.builder);

            Specification.Product.add_meta(this.builder, meta);

            Specification.Product.addEffectiveStartDate(this.builder, Effective_Start_Date);
            Specification.Product.addAvailableStartDate(this.builder, Available_Start_Date);
            Specification.Product.addElementGuid(this.builder, Element_Guid);
            Specification.Product.addElementTypeGuid(this.builder, Element_Type_Guid);
            Specification.Product.addBusinessID(this.builder, Business_ID);
            Specification.Product.addName(this.builder, Name);
            Specification.Product.addDescription(this.builder, Description);
            Specification.Product.addCategoryID(this.builder, Category_ID);
            Specification.Product.addNameInDutch(this.builder, Name_in_Dutch);
            Specification.Product.addDescriptionInDutch(this.builder, Description_in_Dutch);
            Specification.Product.addDescriptionInFrench(this.builder, Description_in_French);
            Specification.Product.addDescriptionInGerman(this.builder, Description_in_German);
            Specification.Product.addNameInFrench(this.builder, Name_in_French);
            Specification.Product.addNameInGerman(this.builder, Name_in_German);
            Specification.Product.addEmailRequired(this.builder, Email_Required);
            Specification.Product.addAttachmentRequired(this.builder, Attachment_Required);
            Specification.Product.addInstallationIdentifierRequired(this.builder, Installation_Identifier_Required);
            Specification.Product.addCommercialNameInEnglish(this.builder, Commercial_Name_in_English);
            Specification.Product.addCommercialNameInFrench(this.builder, Commercial_Name_in_French);
            Specification.Product.addCommercialNameInDutch(this.builder, Commercial_Name_in_Dutch);
            Specification.Product.addCommercialNameInGerman(this.builder, Commercial_Name_in_German);
            Specification.Product.addBusinessCode(this.builder, Business_Code);
            Specification.Product.addIsSellableStandalone(this.builder, Is_Sellable_Standalone);

            Specification.Product.addProductToProduct(this.builder, productToProduct);
            Specification.Product.addMappingRules(this.builder, mappingRules);
            Specification.Product.addCOMClassification(this.builder, com_Classification);
            Specification.Product.addProductLineClassification(this.builder, product_Line_Classification);
            Specification.Product.addMarketSegmentClassification(this.builder, market_Segment_Classification);
            Specification.Product.addSalesChannelClassification(this.builder, sales_Channel_Classification);

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
            let Pattern = this.SafeString(meta.Pattern);
            let path = this.SafeString(meta.path);
            let xsi_type = this.SafeString(meta.xsi_type);
            let BusinessID = this.SafeString(meta.BusinessID);

            Specification.Meta.startMeta(this.builder);

            Specification.Meta.addID(this.builder, ID);
            Specification.Meta.addPattern(this.builder, Pattern);
            Specification.Meta.addPath(this.builder, path);
            Specification.Meta.addXsiType(this.builder, xsi_type);
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
            productToProducts.forEach(function (productToProduct)
            {

                let meta = _this.BuildMeta(productToProduct._meta);

                let product = _this.BuildProduct(productToProduct.Product);


                let Association_Start_Date = _this.SafeString(productToProduct.Association_Start_Date);
                let Max_Occurs = productToProduct.Max_Occurs;
                let Min_Occurs = _this.SafeString(productToProduct.Min_Occurs);
                let Default_Cardinality = _this.SafeString(productToProduct.Default_Cardinality);

                Specification.Product_To_Product.startProduct_To_Product(_this.builder);

                Specification.Product_To_Product.add_meta(_this.builder, meta);
                Specification.Product_To_Product.addAssociationStartDate(_this.builder, Association_Start_Date);
                Specification.Product_To_Product.addMaxOccurs(_this.builder, Max_Occurs);
                Specification.Product_To_Product.addMinOccurs(_this.builder, Min_Occurs);
                Specification.Product_To_Product.addDefaultCardinality(_this.builder, Default_Cardinality);
                Specification.Product_To_Product.addProduct(_this.builder, product);

                fbProductToProducts.push(Specification.Product_To_Product.endProduct_To_Product(_this.builder));
            });
        }

        return Specification.Product.createProductToProductVector(this.builder, fbProductToProducts);
    }

    private BuildMappingRules(mappingRules: any): any
    {

    }
    private BuildClassifications(classifications: any):any
    {

    }
    private SafeString(str: string): string
    {
        if (!str) {
            return null;
        }
        return this.builder.createString(str);
    }
}
export = SpecBuilder;
