/// <reference path="typings/node/node.d.ts" />

import fs          = require("fs");
import SpecBuilder = require("./SpecBuilder");
import PerfLogger  = require("./PerfLogger");

let flatbuffers    = require('flatbuffers').flatbuffers;
let Specification  = require('./Schemas/specification_generated').Specification;

class FlatBuffer
{
    public static Buffer(specFilePath: string): boolean
    {
        let specFile = fs.readFileSync(specFilePath, { encoding: 'utf8' });
        let specJson = JSON.parse(specFile);

        var plog = new PerfLogger("W:\\mylog.csv");
        plog.Start();

    //    console.time("Write JSON to disk");

       plog.Log("Starting of writing JSON to disk");

        fs.writeFileSync("w:\\Work\\itter\\test\\files\\testSpec1.json", JSON.stringify(specJson), { encoding: 'utf8' });

        plog.Log("End of writing JSON to disk");

    //    console.timeEnd("Write JSON to disk");

    //    console.time("Read JSON from disk");
        plog.Log("Starting of Reading JSON from disk");

        let specFile1 = fs.readFileSync("w:\\Work\\itter\\test\\files\\testSpec1.json", { encoding: 'utf8' });
        let specJson1 = JSON.parse(specFile);

        plog.Log("End of Reading JSON from disk");

        plog.End();


    //    console.timeEnd("Read JSON from disk");

            // Assert that the JSON data has the correct data for testSpec.json
        /*  console.log("=SG==> specJson1._meta.ID: " + specJson1._meta.ID);
            console.log("=SG==> specJson1.Business_ID: " + specJson1.Business_ID);
            console.log("=SG==> specJson1.Product_To_Product[0].Max_Occurs: " + specJson1.Product_To_Product[0].Max_Occurs);
            console.log("=SG==> specJson1.Product_To_Product[0].Product._meta.name: " + specJson1.Product_To_Product[0].Product._meta.name);
            console.log("=SG==> specJson1.Product_To_Product[0].Product.Name: " + specJson1.Product_To_Product[0].Product.Name);
            console.log("=SG==> specJson1.Product_To_Product[1]._meta.ID: " + specJson1.Product_To_Product[1]._meta.ID);
            console.log("=SG==> specJson1.Product_To_Product[1].Product._meta.ID: " + specJson1.Product_To_Product[1].Product._meta.ID);
            console.log("=SG==> specJson1.Product_To_Product[1].Product.Business_ID: " + specJson1.Product_To_Product[1].Product.Business_ID);*/


        //console.time("Build a FlatBuffer");

        plog.Log("Starting of Building Flat buffers");

            let specBuilder = new SpecBuilder();
            let buffer = specBuilder.BuildSpec(specJson);
            //console.log("Flat buffer size: " + buffer.length);

        plog.Log("End of Building Flat buffers");

        //console.timeEnd("Build a FlatBuffer");

        //console.time("Write FlatBuffer to disk");

        plog.Log("Starting of Writing Flat buffers to disk");


        fs.writeFileSync("w:\\Work\\itter\\test\\files\\testFB1.dat", new Buffer(buffer));

        plog.Log("End of Writing Flat buffers to disk");

        //console.timeEnd("Write FlatBuffer to disk");

        //console.time("Read FlatBuffer from disk");

        plog.Log("Starting of Reading Flat buffers from disk");

            let fileBuffer = new Uint8Array( fs.readFileSync("w:\\Work\\itter\\test\\files\\testFB1.dat"));
            let bb = new flatbuffers.ByteBuffer(fileBuffer);
            let root = Specification.Product.getRootAsProduct(bb);

        plog.Log("End of Reading Flat buffers from disk");

        plog.End();

        //console.timeEnd("Read FlatBuffer from disk");

        //  Assert that the buffer object has the correct data, same tests as the JSON data
        /*    console.log("=SG==> Reading Flat buffers!!!: " );

            console.log("=CAB==> root.Name: " + root.Name());
            console.log("=CAB==> root.Description: " + root.Description());
            console.log("=CAB==> root.EffectiveStartDate: " + root.EffectiveStartDate());
            console.log("=CAB==> root.ElementGuid: " + root.ElementGuid());
            let meta = root.Meta();
            console.log("=CAB==> root._meta.path: " + meta.path());
            let p2pLength = root.ProductToProductLength();
            console.log("=CAB==> length: " + p2pLength);

            let p2p1 = root.ProductToProduct(0);
            console.log("=CAB==> Start_Date: " + p2p1.AssociationStartDate());

            let p2p2 = root.ProductToProduct(1);
            console.log("=SG==> Meta ID: " + p2p2.Meta().ID());

            let Product1 = root.ProductToProduct(0).Product();
            console.log("=SG==> Product1 meta name: " + Product1.Meta().name());
            console.log("=SG==> Product1 meta ID: " + Product1.Meta().ID());
            console.log("=SG==> Product1 Name: " + Product1.Name());

            let Product2 = root.ProductToProduct(1).Product();
            console.log("=SG==> Product2 ID: " + Product2.Meta().ID());
            console.log("=SG==> Product2 BID: " + Product2.BusinessID());

           console.log("=SG==> root.MappingRules.length: " + root.MappingRules.length);

            let mappingrule1 = root.MappingRules(0);
            console.log("=SG==> mappingrule1.Meta().ID(): " + mappingrule1.Meta().ID());

            let mappingrule5 = root.MappingRules(5);
            console.log("=SG==> mappingrule5.Meta().ID(): " + mappingrule5.Meta().ID());

            let product_11 = root.ProductToProduct(11);
            console.log("=SG==> root.ProductToProduct(11).Name(): " + root.ProductToProduct(11).Product().Name());
            console.log("=SG==> root.ProductToProduct(11).Meta().ID(): " + root.ProductToProduct(11).Meta().ID());

            let child24_product11 = product_11.Product().ProductToProduct(24);
            console.log("=SG==> child1_product11.Name(): " + child24_product11.Product().Name());
            console.log("=SG==> child1_product11.Meta().ID(): " + child24_product11.Meta().ID());

            let GrandChild1_Child24_product11 = child24_product11.Product().ProductToProduct(1);
            console.log("=SG==> GrandChild24_Child1_product11.Name(): " + GrandChild1_Child24_product11.Meta().ID());

           let mappingRule_Grandchild1 = GrandChild1_Child24_product11.Product().MappingRules(0);
           console.log("=SG==> mappingRule_1122Grey.Name(): " + mappingRule_Grandchild1.Name());
            console.log("=SG==> mappingRule_1122Grey.Name(): " + mappingRule_Grandchild1.Meta().ID()); */


        return true;
    }

}
export = FlatBuffer;
