#!/bin/bash
export LD_LIBRARY_PATH=""
aws lambda update-alias --cli-input-json file://update-alias.json --region ap-southeast-2
