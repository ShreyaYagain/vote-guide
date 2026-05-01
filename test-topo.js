import { feature } from 'topojson-client';
import * as fs from 'fs';

const topoData = JSON.parse(fs.readFileSync('./public/maps/india.topo.json', 'utf-8'));
const features = feature(topoData, topoData.objects.india).features;
console.log(features[0].id, features[0].properties);
