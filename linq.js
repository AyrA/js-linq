//Adds .NET Linq Functionality to Arrays

//Example Usage:
//Array.Range(1,9,1).Concat(Array.Range(20, 10, -1)).Where(m => m % 2 === 0).OrderBy(m => m);

//Creates an enumeration of the given properties
Array.Range = function (start, count, step) {
	var ret = [];

	//Force params into valid range
	if (start != start || typeof(start) != typeof(1) || !isFinite(start)) {
		start = 0;
	}
	if (count != count || typeof(count) != typeof(1) || count < 1 || !isFinite(start)) {
		count = 1;
	}
	if (step != step || typeof(step) != typeof(1) || step <= 0 || !isFinite(start)) {
		step = 1;
	}
	for (var i = 0; i < count; i++) {
		ret.push(start);
		start += step;
	}
	return ret;
};

//Returns maximum value
//If given, "exp" must convert the given entry to a number
Array.prototype.Max = function (exp) {
	if (typeof(exp) != typeof(function () {})) {
		if (this.length === 0) {
			return 0;
		}
		return this.reduce(function (a, b) {
			return +b > +a ? +b : +a;
		}, 0);
	}
	return this.reduce(function (a, b) {
		return +exp(b) > +a ? +exp(b) : +a;
	}, 0);
};

//Returns minimum value
//If given, "exp" must convert the given entry to a number
Array.prototype.Min = function (exp) {
	if (typeof(exp) != typeof(function () {})) {
		if (this.length === 0) {
			return 0;
		}
		return this.reduce(function (a, b) {
			return +b < +a ? +b : +a;
		}, 0);
	}
	return this.reduce(function (a, b) {
		return +exp(b) < +a ? +exp(b) : +a;
	}, 0);
};

//Returns last Element that matches the given condition
Array.prototype.Last = function (exp) {
	if (this.length === 0) {
		throw new Error(".Last: Sequence contains no Elements");
	}
	if (typeof(exp) != typeof(function () {})) {
		return this[this.length - 1];
	}
	for (var i = this.length - 1; i >= 0; i--) {
		if (exp(this[i])) {
			return this[i];
		}
	}
	throw new Error(".Last: Sequence contains no Elements");
};

//Returns last Element that matches the given condition
Array.prototype.LastOrDefault = function (exp, def) {
	if (typeof(exp) != typeof(function () {})) {
		return this.length > 0 ? this[this.length - 1] : def;
	}
	for (var i = this.length - 1; i >= 0; i--) {
		if (exp(this[i])) {
			return this[i];
		}
	}
	return def;
};

//Returns unique Element that matches the given condition
Array.prototype.Single = function (exp) {
	if (this.length === 0) {
		throw new Error(".Single: Sequence contains no Elements");
	}
	if (typeof(exp) != typeof(function () {})) {
		if (this.length > 1) {
			throw new Error(".Single: Sequence contains more than one Element");
		}
		return this[0];
	}
	var temp = [];
	for (var i = 0; i < this.length; i++) {
		if (exp(this[i])) {
			temp.push(this[i]);
			if (temp.length > 1) {
				throw new Error(".Single: Sequence contains more than one Element");
			}
		}
	}
	if (temp.length > 0) {
		return temp[0];
	}
	throw new Error("Sequence contains no Elements");
};

//Returns unique Element that matches the given condition
Array.prototype.SingleOrDefault = function (exp, def) {
	if (typeof(exp) != typeof(function () {})) {
		if (this.length > 1) {
			throw new Error(".SingleOrDefault: Sequence contains more than one Element");
		}
		return this.length > 0 ? this[0] : def;
	}
	var temp = [];
	for (var i = 0; i < this.length; i++) {
		if (exp(this[i])) {
			temp.push(this[i]);
			if (temp.length > 1) {
				throw new Error(".SingleOrDefault: Sequence contains more than one Element");
			}
		}
	}
	return temp.length > 0 ? temp[0] : def;
};

//Returns first Element that matches the given condition
Array.prototype.First = function (exp) {
	if (typeof(exp) != typeof(function () {})) {
		if (this.length > 0) {
			throw new Error(".First: Sequence contains no Elements");
		}
		return this[0];
	}
	for (var i = 0; i < this.length; i++) {
		if (exp(this[i])) {
			return this[i];
		}
	}
	throw new Error(".First: Sequence contains no Elements");
};

//Returns first Element that matches the given condition
Array.prototype.FirstOrDefault = function (exp, def) {
	if (typeof(exp) != typeof(function () {})) {
		return this.length > 0 ? this[0] : def;
	}
	for (var i = 0; i < this.length; i++) {
		if (exp(this[i])) {
			return this[i];
		}
	}
	return def;
};

//Orders an array in descending order
//If given, "exp" must convert an entry to a number
Array.prototype.OrderByDescending = function (exp) {
	if (typeof(exp) != typeof(function () {})) {
		exp = function (x) {
			return +x;
		};
	}
	return this.sort(function (a, b) {
		return exp(b) - exp(a);
	});
};

//Orders an array in ascending order
//If given, "exp" must convert an entry to a number
Array.prototype.OrderBy = function (exp) {
	if (typeof(exp) != typeof(function () {})) {
		exp = function (x) {
			return +x;
		};
	}
	return this.sort(function (a, b) {
		return exp(a) - exp(b);
	});
};

//Aliases for built-ins

Array.prototype.Reverse = function () {
	return this.reverse();
};

Array.prototype.Skip = function (count) {
	if (typeof(count) !== typeof(1) || count !== count || count < 0) {
		throw new Error(".Skip: count is not a positive number");
	}
	return this.length > count ? this.slice(count) : [];
};

Array.prototype.Take = function (count) {
	if (typeof(count) !== typeof(1) || count !== count || count < 0) {
		throw new Error(".Take: exp is not a function");
	}
	return this.length > count ? this.slice(0, count) : this;
};

Array.prototype.Where = function (exp) {
	if (typeof(exp) !== typeof(function () {})) {
		throw new Error(".Where: exp is not a function");
	}
	return this.filter(exp);
};

Array.prototype.Select = function (exp) {
	if (typeof(exp) !== typeof(function () {})) {
		throw new Error(".Select: exp is not a function");
	}
	return this.map(exp);
};

Array.prototype.Concat = function (arr) {
	return this.concat(arr);
};

Array.prototype.Distinct = function (exp) {
	if (typeof(exp) !== typeof(function () {})) {
		return this.filter(function (v, i, a) {
			return a.indexOf(v) === i;
		});
	} else {
		var cache = [];
		return this.filter(function (v, i, a) {
			var temp = exp(v);
			if (cache.indexOf(temp) < 0) {
				cache.push(temp);
				return true;
			}
			return false;
		});
	}
};

console.log(
	Array.Range(0, 9, 1)
	.Concat(Array.Range(20, 20, -1))
	.Distinct()
	.Where(m => m % 2 === 0)
	.OrderBy(m => m));
