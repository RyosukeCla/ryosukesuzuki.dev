cd build;
git add -A;
now=$(date -R);
comment="deploy ${now}";
git commit -m "${comment}";
git push origin master -f;
cd ../;