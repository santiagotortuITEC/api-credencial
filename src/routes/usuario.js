const { response } = require('express');
const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');
 
 
 
// GET todos Usuarios 
router.get('/usuario', (req, res) => {
  mysqlConnection.query('SELECT * FROM usuario', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      res.status(404).json({ err });
      console.log(err);
    }
  });  
});

// GET a un usuario
router.get('/usuario/:username', (req, res) => {
  const { username } = req.params;
  mysqlConnection.query(`SELECT * FROM usuario WHERE nom_usu = '${username}'`, (err, rows, fields) => {
    if (!err) {
       res.json(rows[0]); 
    } else {
      res.status(404).json({ err });
      console.log(err);
    } 
  });
});


// GET persona
router.get('/persona/:dni', (req, res) => {
  const { dni } = req.params;
  mysqlConnection.query(`SELECT persona.idPersona FROM persona WHERE documentoPersona = '${dni}'`, (err, rows, fields) => {
    if (!err) {
       res.json(rows[0]); 
    } else {
      res.status(404).json({ err });
      console.log(err);
    } 
  });
});

// POST usuario
router.post('/usuario', (req, res) => { 
    mysqlConnection.query(
      `
      INSERT INTO usuario (nom_usu, con_usu, id_tusu)
      VALUES ('${req.body.nom_usu}','${req.body.con_usu}','${req.body.id_tusu}') 
      `, (err, rows, fields) => {
      if (!err) {
        console.log('rows /usuario: ', rows)
          res.json(rows[0]); 
      } else {
        res.status(404).json({ err });
        console.log('-------> ',err);
        //return (req.body);
      } 
    });

  });


// PUT persona
router.put('/persona', (req, res) => { 
  mysqlConnection.query(
    `
    UPDATE persona
    SET persona.nombrePersona = '${req.body.nombre} ${req.body.apellido}',
      persona.cuilPersona = '${req.body.cuil}',
      persona.celPersona = '${req.body.celular}'
    WHERE persona.idPersona = '${req.body.idPersona}'       
    `, (err, rows, fields) => {
    if (!err) {
      console.log('rows /afiliadopersona: ', rows)

       res.json(rows[0]); 
    } else {
      res.status(404).json({ err });
      console.log(err);
    } 
  });
});




// PUT afiliado
router.put('/afiliado', (req, res) => { 
  mysqlConnection.query(
  ` 
  SET foreign_key_checks = 0;
  UPDATE afiliado
  SET afiliado.id_usu = '${req.body.idusu}' 
  WHERE afiliado.idPersona = '${req.body.idPersona}'       
  `, (err, rows, fields) => {
  if (!err) {
      console.log('rows afiliado: ', rows)
      res.json(rows[0]); 
  } else {
    res.status(404).json({ err });
    console.log(err);
  } 
});
});

// GET empresa
router.get('/empresa/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(`SELECT emp.rs_emp FROM emp WHERE id_emp = '${id}'`, (err, rows, fields) => {
    if (!err) {
       res.json(rows[0]); 
    } else {
      res.status(404).json({ err });
      console.log(err);
    } 
  });
});

// GET afiliadoflia
router.get('/afiliadoflia/:idpersona', (req, res) => {
  const { idpersona } = req.params;
  mysqlConnection.query(`
    SELECT afiliadoflia.idPersonaA, afiliadoflia.parentescoAfiliadoflia
    FROM afiliadoflia 
    WHERE idPersona = '${idpersona}'
    `, (err, rows, fields) => {
    if (!err) {
       res.json(rows[0]); 
    } else {
      res.status(404).json({ err });
      console.log(err);
    } 
  });
});

/**
 * 
 * 
 * 

REVISAR LOS SIGUIENTES METODOS -- FUNCION PARA EL LOGIN

 */



// GET un ult user
router.get('/lastusuario/:username', (req, res) => {
  const { username } = req.params;
  mysqlConnection.query(`SELECT * FROM usuario WHERE nom_usu = '${username}'`, (err, rows, fields) => {
    if (!err) {
       res.json(rows[0]); 
    } else {
      res.status(404).json({ err });
      console.log(err);
    } 
  });
});

// GET un Usuario via ID_usu
router.get('/usuarioactivo/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(`SELECT * FROM usuarioactivo WHERE id_usu = ${id}`, (err, rows, fields) => {
    if (!err) {
       res.json(rows[0]); 
    } else {
      res.status(404).json({ err });
      console.log(err);
    } 
  });
});

// GET un Usuario via ID_persona
router.get('/usuarioactivoflia/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(`SELECT * FROM usuarioactivo WHERE idPersona = ${id}`, (err, rows, fields) => {
    if (!err) {
       res.json(rows[0]); 
    } else {
      res.status(404).json({ err });
      console.log(err);
    } 
  });
});

// GET un Usuario via dni
router.get('/usuarios/:dni', (req, res) => {
    const { dni } = req.params;
    mysqlConnection.query(`SELECT * FROM usuarioactivo WHERE documentoPersona = ${dni}`, (err, rows, fields) => {
      if (!err) {
         res.json(rows[0]); 
      } else { 
        res.status(404).json({ err });
        console.log(err);
      } 
    });
  });


// // GET todos Usuarios - usuarioactivo
// router.get('/usuarios', (req, res) => {
//     mysqlConnection.query('SELECT * FROM usuarioactivo', (err, rows, fields) => {
//       if(!err) {
//         res.json(rows);
//       } else {
//         console.log(err);
//       }
//     });  
//   });


// // GET un Usuario via ID
// router.get('/usuarioactivo/:id', (req, res) => {
//   const { id } = req.params;
//   mysqlConnection.query(`SELECT * FROM usuarioactivo WHERE id_usu = ${id}`, (err, rows, fields) => {
//     if (!err) {
//        res.json(rows[0]); 
//     } else {
//       console.log(err);
//     } 
//   });
// });




 
  
//  // UPDATE persona
// router.put('/persona/:dni', (req, res) => { 
//   const { dni } = req.params;
//   console.log('req.body---> ', req.body);
//   mysqlConnection.query(
//     `
//     UPDATE persona
//     SET persona.nombrePersona = '${req.body.nombre} ${req.body.apellido}',
//       persona.cuilPersona = '${req.body.cuil}',
//       persona.celPersona = '${req.body.celular}'
//     WHERE persona.documentoPersona = '${dni}'       
//     `, (err, rows, fields) => {
//     if (!err) {
//        res.json(rows[0]); 
//     } else {
//       console.log(err);
//     } 
//   });
// });

// // GET una Persona
// router.get('/persona/:dni', (req, res) => {
//   const { dni } = req.params;
//   mysqlConnection.query(`SELECT * FROM persona WHERE documentoPersona = ${dni}`, (err, rows, fields) => {
//     if (!err) {
//        res.json(rows[0]); 
//     } else {
//       console.log(err);
//     } 
//   });
// });

//  // UPDATE afiliado - id: persona
//  router.put('/afiliado/:idPersona', (req, res) => { 
//   const { idPersona } = req.params;
//   console.log('req.body(afiliado)---> ', req.body);
//   mysqlConnection.query(
//     `
//     SET foreign_key_checks = 0;
//     UPDATE afiliado
//     SET afiliado.id_usu = '${req.body.idusu}' 
//     WHERE afiliado.idPersona = '${idPersona}'       
//     `, (err, rows, fields) => {
//     if (!err) {
//        res.json(rows[0]); 
//     } else {
//       console.log(err);
//     } 
//   });
// });


//  // UPDATE afiliadoflia - id: persona
//  router.post('/afiliadoflia/:idPersona', (req, res) => { 
//   const { idPersona } = req.params;
//   console.log('req.body(afiliadoflia)---> ', req.body);
//   mysqlConnection.query(
//     `
//     INSERT INTO afiliadoflia (idPersona, parentescoAfiliadoflia)
//     VALUES ('${idPersona}','${req.body.parentesco}')    
//     `, (err, rows, fields) => {
//     if (!err) {
//        res.json(rows[0]); 
//     } else {
//       console.log(err);
//     } 
//   });
// });

// // GET afiliado 
// router.get('/afiliado/:username', (req, res) => {
//   const { username } = req.params;
//   mysqlConnection.query( `
//     SELECT afiliado.numAfiliado, afiliado.fingresoAfiliado, persona.nombrePersona, persona.documentoPersona, emp.rs_emp, usuario.nom_usu
//     FROM SindicatoCarneDB.afiliado
//     INNER JOIN SindicatoCarneDB.persona
//       ON afiliado.idPersona = persona.idPersona 
//     INNER JOIN SindicatoCarneDB.usuario 
//       ON afiliado.id_usu = usuario.id_usu AND usuario.nom_usu = '${username}'
//     INNER JOIN SindicatoCarneDB.emp
//       ON afiliado.id_emp = emp.id_emp;
//         `, (err, rows, fields) => {
//     if (!err) {
//        res.json(rows[0]); 
//     } else {
//       console.log(err);
//     } 
//   });
// });

module.exports = router; 