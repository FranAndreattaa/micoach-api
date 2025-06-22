const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: 'AQUÍ_TU_API_KEY'
});

app.post('/generar-entrenamiento', async (req, res) => {
  const { edad, duracion, objetivos } = req.body;

  const prompt = `Eres un entrenador experto de minibasket. Genera una sesión de entrenamiento para niños de ${edad} años. Duración: ${duracion} minutos. Objetivo: ${objetivos}. Divide la sesión en bloques simples, divertidos y adaptados al nivel base.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Actúa como un entrenador experto de minibasket.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.8
    });

    res.json({ resultado: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error generando entrenamiento:', error);
    res.status(500).json({ error: 'Hubo un problema generando el entrenamiento.' });
  }
});

app.get('/', (req, res) => {
  res.send('MiCoach backend funcionando ✅');
});

app.listen(port, () => {
  console.log(`Servidor MiCoach escuchando en puerto ${port}`);
});
