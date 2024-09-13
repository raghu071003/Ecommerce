import React from 'react'
import axios from 'axios'

const DesignShirt = async() => {

// const options = {
//   method: 'GET',
//   url: 'https://img4me.p.rapidapi.com/',
//   params: {
//     text: 'Test Me',
//     font: 'trebuchet',
//     size: '12',
//     fcolor: '000000',
//     bcolor: 'FFFFFF',
//     type: 'png'
//   },
//   headers: {
//     'x-rapidapi-key': '8405a41742msh8a09513a4d32c59p15eb66jsna6c8db25d489',
//     'x-rapidapi-host': 'img4me.p.rapidapi.com'
//   }
// };
const options = {
    method: 'POST',
    url: 'https://ai-text-to-image-generator-api.p.rapidapi.com/realistic',
    headers: {
      'x-rapidapi-key': '8405a41742msh8a09513a4d32c59p15eb66jsna6c8db25d489',
      'x-rapidapi-host': 'ai-text-to-image-generator-api.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      inputs: 'Find serenity in the tranquil elegance of a solitary sailboat drifting on a glassy lake at sunset'
    }
  };
  
  try {
      const response = await axios.request(options);
      console.log(response.data);
  } catch (error) {
      

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }
//     const generateImage = async (prompt) => {
//         try {
//           const response = await axios.post('https://api.openai.com/v1/images/generations', {
//             prompt: prompt,
//             n: 1,
//             size: "1024x1024",
//           }, {
//             headers: {
//               'Authorization': `Bearer YOUR_API_KEY`,
//               'Content-Type': 'application/json',
//             },
//           });
      
//           return response.data.data[0].url; // URL of the generated image
//         } catch (error) {
//           console.error('Error generating image:', error);
//         }
//       };
      
//       // Example usage
//       generateImage('A minimalist design of a mountain range in pastel colors')
//         .then(url => console.log('Generated image URL:', url));
  return (
    <div>DesignShirt</div>
  )
}
}

export default DesignShirt