from __future__ import print_function

import json

print('Loading function')


def lambda_handler(event, context):
    print("value1 = " + event['key1'])
    print("value2 = " + event['key2'])
    print("value3 = " + event['key3'])
    return event['key1'] + "Hello Melbourne"# Echo back the first key value
