'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({strapi}) =>({
    async create(ctx){
        const result = await super.create(ctx);

        console.log(result);

        const {default: axios} = require('axios');
        const {xenditHeaders} = require('../helpers/header.js');

        console.log(xenditHeaders);

        const payload = {
            external_id: result.data.toString(),
            payer_email: 'ferys2343@gmail.com',
            description: 'payment for product',
            amount: result.data.attributes.totalPrice
        }

        console.log(payload);
        const response = await axios({
            method: 'POST',
            url: 'https://api.xendit.co/v2/invoices',
            headers: xenditHeaders,
            data: JSON.stringify(payload)
        });

        console.log('ini respone',response.data);
        return JSON.stringify(response.data)
    }
}) );
