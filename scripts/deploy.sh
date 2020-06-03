#!/bin/bash

yarn build

tar czvf - build | ssh web "cat | tar zxvf -"

# Remove old website files
ssh web "sudo rm -r /var/www/ees.oparkins.com/*"

# Move new website files
ssh web "sudo mv build/* /var/www/ees.oparkins.com/"

# Remove temp files
ssh web rm -r build

date
