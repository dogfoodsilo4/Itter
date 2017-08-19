/// <reference path="typings/node/node.d.ts" />

import fs          = require("fs");

class GraphBuilder
{
    constructor()
    {
        if (!process.argv || process.argv.length < 4)
        {
            console.log("You must specifiy a dataset path & output file. e.g. node GraphBuilder.js c:\\mydata c:\\myoutputfile.nq");
            return;
        }

        let dataPath = process.argv[2];
        let outpuFile = process.argv[3];

        this.Build(dataPath, outpuFile);
    }

    private Build(dataPath: string, outputFile: string): void
    {
        let relations: string[] = [];

        this.BuildInstances(dataPath, relations);

        this.BuildRelationships(dataPath, relations);

        this.OutputData(relations, outputFile);
    }

    private BuildInstances(dataPath: string, relations: string[]): void
    {
        let instancesFilePath = dataPath + "\\Instances.json";

        // TODO: Ultimately we'd want to stream this in
        let instances = JSON.parse(fs.readFileSync(instancesFilePath, { encoding: 'utf8' }));

        // Read each instance
        Object.keys(instances).forEach((key: string) =>
        {
            let instance = instances[key];

            if (instance.Meta)
            {
                instance.Meta.forEach((meta: any) =>
                {
                    let relation = "meta/" + meta.Name;
                    relations.push(this.BuildQuadForString(key, relation, meta.Value));
                });
            }

            if (instance.Data)
            {
                instance.Data.forEach((data: any) =>
                {
                    // HACK: TODO: saves escaping suff for now. needs fixing though
                    if (data.Name !== "Regular_Expression"
                        && data.Name !== "Char_Value_Code")
                    {
                        // TODO: Is there a need to store the SchemaElementGuid and Type?
                        let relation = "data/" + data.Name;
                        relations.push(this.BuildQuadForString(key, relation, data.Value));
                    }
                });
            }
        });
    }

    private BuildRelationships(dataPath: string, relations: string[]): void
    {
        let relationshipsFilePath = dataPath + "\\relationships.json";

        // TODO: Ultimately we'd want to stream this in
        let relationships = JSON.parse(fs.readFileSync(relationshipsFilePath, { encoding: 'utf8' }));

        // Read each relationship
        Object.keys(relationships).forEach((key: string) =>
        {
            relationships[key].forEach((relationship: any) =>
            {
                // TODO: can we decorate the relation with SchemaElementGuid, IsDependent & DependentDataKind?
                // TODO: not sure if we should create the product_to_product/product link directly here?

                let relation = "relation/" + relationship.Kind;
                relations.push(this.BuildQuadForEntity(key, relation, relationship.Child));
            });

        });
    }

    private OutputData(relations: string[], outputFile: string): void
    {
        var file = fs.createWriteStream(outputFile);

        file.on('error', function (err) {
            /* log and continue on error */
            console.log("ERROR, Unable to write to log file: " + outputFile);
            console.log(err.toString());
        });

        // Write each log item to file
        relations.forEach((relation: string) => {
            file.write(relation + "\r\n");
        });

        file.end();
    }

    private BuildQuadForString(key: string, relation: string, value: string): string
    {
        if (value)
        {
            value = value.replace(/\n|\r/g, "").replace(/\\([\s\S])|(")/g, "\\$1$2");
        }
        return "<" + key + "> <" + relation + "> \"" + value + "\" .";
    }

    private BuildQuadForEntity(key: string, relation: string, value: string): string
    {
        return "<" + key + "> <" + relation + "> <" + value + "> .";
    }
}

// Run on start
let start = new GraphBuilder();

export = GraphBuilder;
