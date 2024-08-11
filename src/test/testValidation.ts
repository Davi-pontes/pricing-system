import { z } from 'zod';

class Teste {
    constructor(readonly data: object) {}

    validate() {
        const schema = z.object({
            name: z.string({ message: 'Name é necessário ser uma string' }).max(20, { message: 'O máximo de caracteres é 20' }),
            phone_number: z.string({ message: 'Phone number is necessary' })
                .min(11, { message: 'Formato de número errado' })
                .max(11, { message: 'Formato de número errado' })
        });
        
        const result = schema.safeParse(this.data);

        console.log(result.error);
    }
}

const t = new Teste({ name: 'davi', phone_number: '1234567891011' });

t.validate();
