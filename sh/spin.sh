#!/bin/bash

echo "Content-type: text/html"
echo ""

declare -A table
declare -A spin
declare -A result

table[11]=0; table[12]=0; table[13]=100; table[14]=150; table[15]=200
table[21]=0; table[22]=0; table[23]=50;  table[24]=100; table[25]=150
table[31]=0; table[32]=0; table[33]=25;  table[34]=50;  table[35]=100
table[41]=0; table[42]=0; table[43]=25;  table[44]=50;  table[45]=100; 
table[51]=0; table[52]=0; table[53]=15;  table[54]=25;  table[55]=50
table[61]=0; table[62]=0; table[63]=10;  table[64]=20;  table[65]=35
table[71]=0; table[72]=0; table[73]=5;   table[74]=10;  table[75]=15

echo '{'

# SPIN RESULT
echo '"spin": [ '
for i in {1..14}
do
	spin[$i]="$(( $RANDOM % 7 + 1 ))"
	echo \""${spin[$i]}"\",
done
spin[15]="$(( $RANDOM % 7 + 1 ))"
echo \""${spin[15]}"\"
echo '],'

#SUCCES RESULT
echo '"result": [ '

nbresult=0
function count {
    line=$1
    string="${spin[$2]}""${spin[$3]}""${spin[$4]}""${spin[$5]}""${spin[$6]}"
    result=$(echo $string | sed 's/\(.\)/\1\n/g' | grep -v ^$ | sort | uniq -c | sort -rn | head -n 1 | sed "s/ //g")
    num_win=${result:0:1}
    value=${result:1:1}
    amount=${table[$value$num_win]}

    if [[ $amount > 0 ]]; then
	if [[ $nbresult == 0 ]]; then 
		nbresult=$(( $nbresult + 1 ))
	else
		echo -n ","
	fi
	echo '{ "line": '$line', "amount": '$amount', "num_win": '$num_win', "value": '$value', "list": [ '
	first=0
    	for win in $2 $3 $4 $5 $6
    	do
	    if [[ ${spin[$win]} == $value ]]; then
		win=$(( $win - 1 ))
	    	row=$(( $win / 5 ))
	    	col=$(( $win % 5 ))
		[[ $first == 1 ]] && echo -n ","
		first=1
	    	echo -n '{"row": '$row', "col": '$col', "value": '$value'}'
	    fi
    	done
    	echo " ] } "
    fi
}

count 1 6 7 8 9 10
count 2 1 2 3 4 5
count 3 11 12 13 14 15
count 4 1 7 13 9 5
count 5 11 7 3 9 15
count 6 6 2 3 4 10
count 7 6 12 13 14 10
count 8 1 2 8 14 15
count 9 11 12 8 4 5
count 10 6 12 8 4 10
count 11 11 2 14 10
count 12 1 7 8 9 5
count 13 11 7 8 9 15
count 14 1 7 3 9 5
count 15 11 7 13 9 15
count 16 6 7 3 9 10
count 17 6 7 13 9 10
count 18 1 2 13 4 5
count 19 11 12 3 14 15
count 20 1 12 13 14 4

echo ']'

echo '}'

exit 0
