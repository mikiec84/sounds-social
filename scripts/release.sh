read -p "Did you test and alias the deployments?" -n 1 -r
echo


if [[ $REPLY =~ ^[Yy]$ ]]
then
 release
fi
