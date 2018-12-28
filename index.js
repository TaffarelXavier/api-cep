var express = require('express'),
    router = express.Router(),
    request = require('request'),
    iconv = require('iconv-lite'),
    cheerio = require('cheerio');

module.exports = function (req, res, next) {

    const URL = `http://www.buscacep.correios.com.br/sistemas/buscacep/resultadoBuscaCep.cfm`;

    var _uf = req.body.UF,
        _localidade = req.body.Localidade,
        _logradouro = req.body.Logradouro;

    request = request.defaults({ jar: true });

    request.post({
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        followAllRedirects: true,
        url: URL,
        form: {
            UF: _uf,
            Localidade: _localidade,
            Tipo: '',
            Logradouro: _logradouro,
            Numero: ''
        },
        encoding: null
    }, function (error, response, html) {

        var utf8String = iconv.decode(html, "ISO-8859-1");

        var $ = cheerio.load(utf8String);

        var ceps = [];

        $('table tr').each(function (i, element) {

            var _self = $(this);

            if (i > 0) {

                ceps[i - 1] = {
                    cidade: _self.find('td').eq(2).text().trim(),
                    cep: _self.find('td').eq(3).text().trim()
                };

            }

        });
        res.send(ceps);
    });
    
    next();
}