/// <reference path="typings/node/node.d.ts" />

import fs          = require("fs");
import SpecBuilder = require("./SpecBuilder");

let flatbuffers    = require('flatbuffers').flatbuffers;
let Specification  = require('./Schemas/specification_generated').Specification;

class FlatBuffer
{
    public static Buffer(specFilePath: string): boolean
    {
        let specFile = fs.readFileSync(specFilePath, { encoding: 'utf8' });
        let specJson = JSON.parse(specFile);

        console.time("Write JSON to disk");

            // TODO:

        console.timeEnd("Write JSON to disk");

        console.time("Read JSON from disk");

            // TODO:

        console.timeEnd("Read JSON from disk");

            // TODO: Assert that the JSON data has the correct data

        console.time("Build a FlatBuffer");

            let specBuilder = new SpecBuilder();
            let buffer = specBuilder.BuildSpec(specJson);

            // TODO: Add the product.product_To_Product.Product data to the spec builder and test it works

        console.timeEnd("Build a FlatBuffer");

        console.time("Write FlatBuffer to disk");

            // TODO: write the binary file from disk

        console.timeEnd("Write FlatBuffer to disk");

        console.time("Read FlatBuffer from disk");

            let fileBuffer = buffer; // TODO:  Change this to read the binary file from disk

            let bb = new flatbuffers.ByteBuffer(fileBuffer);
            let root = Specification.Product.getRootAsProduct(bb);

        console.timeEnd("Read FlatBuffer from disk");

        // TODO: Assert that the buffer object has the correct data, same tests as the JSON data

            console.log("=CAB==> root.Name: " + root.Name());
            console.log("=CAB==> root.Description: " + root.Description());
            console.log("=CAB==> root.EffectiveStartDate: " + root.EffectiveStartDate());
            console.log("=CAB==> root.ElementGuid: " + root.ElementGuid());

            let p2pLength = root.ProductToProductLength();
            console.log("=CAB==> length: " + p2pLength);

            let p2p = root.ProductToProduct(0);
            console.log("=CAB==> Start_Date: " + p2p.AssociationStartDate());

            let meta = root.Meta();
            console.log("=CAB==> root._meta.path: " + meta.path());

        return true;
    }

}
export = FlatBuffer;
