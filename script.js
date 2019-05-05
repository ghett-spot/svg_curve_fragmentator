Number.prototype.round = function(places) {
	return +(Math.round(this + "e+" + places)  + "e-" + places);
}
arr_merge = (arr0, arr1) => arr0.map((item, i) => (item + arr1[i]).round(2));
arr_magnitude = (arr) => (Math.hypot(...arr));

function fragmentator (source, output_storage) {
	for (key in source) {
		output_storage[key] = {};

		//-1 FROM END
		var tmp_arr = source[key].slice();
		while (tmp_arr.length>1) {
			var tmp_str = '';
			var tmp_dash = 0;
			tmp_arr.forEach(function(item,index){
				tmp_dash = (tmp_dash+arr_magnitude(item)).round(0);
				if (index==0) {tmp_str='m';tmp_dash=0;}
				else if (index==1) {tmp_str=tmp_str+' l'};
				tmp_str = tmp_str + ' ' + item;
			});
			output_storage[key][tmp_str]=tmp_dash;
			tmp_arr.pop();
		};

		//-1 FROM START
		tmp_arr = source[key].slice();
		while (tmp_arr.length>2) {
			var tmp_str = '';
			var tmp_dash = 0;
			tmp_arr[1] = arr_merge(tmp_arr[0],tmp_arr[1]);
			tmp_arr.shift();
			tmp_arr.forEach(function(item,index){
				tmp_dash = (tmp_dash+arr_magnitude(item)).round(0);
				if (index==0) {tmp_str='m';tmp_dash=0;}
				else if (index==1) {tmp_str=tmp_str+' l'};
				tmp_str = tmp_str + ' ' + item;
			});
			output_storage[key][tmp_str]=tmp_dash;
		};

		//-1 TO MIDDLE
		tmp_arr = source[key].slice();
		tmp_arr[1] = arr_merge(tmp_arr[0],tmp_arr[1]);
		tmp_arr.shift();
		tmp_arr.pop();
		
		while (tmp_arr.length>2) {
			var tmp_str = '';
			var tmp_dash = 0;
			tmp_arr.forEach(function(item,index){
				tmp_dash = (tmp_dash+arr_magnitude(item)).round(0);
				if (index==0) {tmp_str='m';tmp_dash=0;}
				else if (index==1) {tmp_str=tmp_str+' l'};
				tmp_str = tmp_str + ' ' + item;
			});
			output_storage[key][tmp_str]=tmp_dash;
			tmp_arr[1] = arr_merge(tmp_arr[0],tmp_arr[1]);
			tmp_arr.shift();
			tmp_arr.pop();
		};
	};
}