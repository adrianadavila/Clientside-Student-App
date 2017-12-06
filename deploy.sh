
#/bin/bash
#upload files
s3cmd --exclude '.git/*' sync --delete-removed ./dist/ s3://mvc-student-app/
#set content type of css files
s3cmd --recursive modify --add-header='content-type':'text/css' --exclude '' --include '.css' s3://mvc-student-app/
#make everything public
s3cmd setacl s3://mvc-student-app --acl-public --recursive
