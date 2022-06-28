for l in $(ls)
do
 echo $(file --mime-type -b "$l")
  if [[ $(file --mime-type -b "$l") == image/png ]] || [[ $(file --mime-type -b "$l") == image/jpeg ]];
  then
    cwebp -q 80 $l -o "${l%.*}.webp"
    rm $l
  fi
done
