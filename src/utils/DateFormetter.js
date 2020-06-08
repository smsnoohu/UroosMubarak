export const DateFormetter = (date) => {
    const newDate = new Date(date);

    let dd = newDate.getDate();
    let mm = newDate.getMonth() + 1; //January is 0!
    let yyyy = newDate.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
	// let shortDate = format === ('dd/MM/yyyy' || null || undefined || '') ? dd + '/1' + mm + '/' + yyyy : 'MM/dd/yyyy' ? mm + '/2' + dd + '/' + yyyy : 'yyyy/MM/dd' ? yyyy + '/3' + mm + '/' + dd : 'yyyy/dd/MM' ? yyyy + '/4' + dd + '/' + mm : dd + '/5' + mm + '/' + yyyy;
	// console.log('format: ', format);
	let shortDate = dd + '/' + mm + '/' + yyyy;
    return shortDate;
};

const gmod = (n,m) => ((n%m)+m)%m;

const islamicCalendar = (dt) => {
    let today = dt;
    let day, month, year, m, y, a, b, jd, bb, cc, dd, ee, wd, iyear, epochastro, shift, z, cyc, j, iy, im, id, myRes;
	day = today.getDate();
	month = today.getMonth();
	year = today.getFullYear();
	m = month+1;
	y = year;
	if(m < 3) {
		y -= 1;
		m += 12;
	}

	a = Math.floor(y/100.);
	b = 2 - a + Math.floor(a/4.);
	if(y < 1583) b = 0;
	if(y === 1582) {
		if(m > 10)  b = -10;
		if(m === 10) {
			b = 0;
			if(day > 4) b = -10;
		}
	}

	jd = Math.floor(365.25*(y + 4716)) + Math.floor(30.6001*(m + 1)) + day + b - 1524;

	b = 0;
	if(jd > 2299160){
		a = Math.floor((jd - 1867216.25)/36524.25);
		b = 1 + a - Math.floor(a/4.);
	}
	bb = jd + b + 1524;
	cc = Math.floor((bb - 122.1)/365.25);
	dd = Math.floor(365.25 * cc);
	ee = Math.floor((bb - dd)/30.6001);
	day =(bb - dd) - Math.floor(30.6001 * ee);
	month = ee - 1;
	if(ee > 13) {
		cc += 1;
		month = ee - 13;
	}
	year = cc - 4716;
    wd = gmod(jd + 1,7)+1;
	iyear = 10631./30.;
	epochastro = 1948085;
	// let epochcivil = 1948085;

	shift = 8.01/60.;
	
	z = jd - epochastro;
	cyc = Math.floor(z/10631.);
	z = z - 10631 * cyc;
	j = Math.floor((z - shift)/iyear);
	iy = 30 * cyc+j;
	z = z - Math.floor(j * iyear + shift);
	im = Math.floor((z + 28.5001)/29.5);
	if(im === 13) im = 12;
	id = z - Math.floor(29.5001 * im-29);

	myRes = new Array(8);

	myRes[0] = day; //calculated day (CE)
	myRes[1] = month-1; //calculated month (CE)
	myRes[2] = year; //calculated year (CE)
	myRes[3] = jd-1; //julian day number
	myRes[4] = wd-1; //weekday number
	myRes[5] = id; //islamic date
	myRes[6] = im-1; //islamic month
	myRes[7] = iy; //islamic year

	return myRes;
}
const iMonthNames = ["Muharram","Safar","Rabi ul Awwal","Rabi ul Akhir","Jaamadul Awwal","Jaamadul Akhir","Rajab","Sha'ban","Ramadhan","Shawwal","Dhul Qadah","Dhul Hijjah"];
export const formatHijiriDate = (dt) => {
	// const wdNames = ["Ahad","Ithnin","Thulatha","Arbaa","Khams","Jumuah","Sabt"];
	const iDate = islamicCalendar(dt);
	// const outputIslamicDate = wdNames[iDate[4]] + ", " + iDate[5] + " " + iMonthNames[iDate[6]] + " " + iDate[7] + " AH";
	const outputIslamicDate = iDate[5] + " " + iMonthNames[iDate[6]] + ", " + iDate[7] + " AH";
	return outputIslamicDate;
}

export const getHijiriDay = (date) => {
	const iDate = islamicCalendar(date);
	return iDate[5];
}

export const getHijiriMonth = (date) => {
	const iDate = islamicCalendar(date);
	// const outputIslamicDate = iMonthNames[iDate[6]]
	return iMonthNames[iDate[6]].split(', ')[0].replace(/[0-9]/g, '').trim().replace("'",'').replace(' ', '-');
}